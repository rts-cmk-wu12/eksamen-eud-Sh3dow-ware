## Installation

Installation af selve projektet:
- ``Download ZIP`` eller ``git clone url-to-repository``
- ``npm i`` *Dette ville installere alle dependecies som du har brug for.*
- ``npm run dev`` *Dette kører selve projektet normalt på: http://localhost:3000*
### Tech Stack
- TypeScript
- Sass(.sass)
- NextJS
- React
- Git
- Github


**Min begrundelse for tech-stack valg:**
#### 1. **TypeScript**

TypeScript er et superset af JavaScript, som tilføjer statisk typesystem og værktøjer til fejlfinding i udviklingsfasen. Det hjælper mig med at finde fejl tidligt, forbedrer autocomplete og kode kvalitet.

**Alternativer:**
- JavaScript (uden typer) mere fleksibelt, men også mere risikabelt i større projekter pga. at man ikke altid kender typerne.

**Begrundelse for valget:**  
TypeScript giver langt bedre struktur og sikkerhed i koden fordi, men kender typerne.

---

#### 2. **Sass (.sass)**

Sass er en CSS preprocessor, der giver mulighed for variabler, nesting, mixins og mere genanvendelig styling. Det gør det nemmere at organisere og skalere.

**Alternativer:**
- Almindelig CSS simpelt, men uden de ekstra funktioner Sass giver.
- Tailwind CSS utility-first framework, som nogle foretrækker, men det kræver en anden måde at tænke styling på fordi det er class-baseret.


**Begrundelse for valget:**  
Sass er et godt kompromis mellem struktur og fleksibilitet, især i mindre til mellemstore projekter, hvor man gerne vil holde styling adskilt fra logikken.

---

#### 3. **Next.js**
Next.js er et fullstack framework bygget oven på React. Det tilbyder både server-side rendering (SSR), uden at man selv skal konfigurere det hele fra bunden.

**Alternativer:**
- React App godt til simple projekter, men mangler mange af de avancerede funktioner Next.js har.

- Vite + React hurtigt setup, men kræver mere konfiguration hvis man vil have server-side features.

**Begrundelse for valget:**  
Next.js gør det nemt at komme i gang, men giver stadig stor fleksibilitet og performance-muligheder, som er svære at opnå med andre løsninger.

---

#### 4. **React**

React er et komponentbaseret bibliotek til at bygge hjemmesider. Det er det mest udbredte frontend-library i verden og har et kæmpe økosystem.

**Alternativer:**
- Vue lettere at komme i gang med for nogle, men mindre mindre økosystem end react.
- Angular framework, men strukturen er ikke helt det samme som react.

**Begrundelse for valget:**  
React har solid dokumentation, stort community, og det passer perfekt sammen med både TypeScript og Next.js. Det er fleksibelt og skalerbart.

---

#### 5. **Git og GitHub**

Git er versionsstyring, og GitHub er en hostingplatform til at gemme og samarbejde om kodeprojekter. Det bruges til at holde styr på ændringer, arbejde i branches, og til kodegennemgang.

**Alternativer:**
- GitLab tilbyder lignende funktionalitet, men GitHub er det mest brugte og integrerer godt med mange værktøjer.

**Begrundelse for valget:**  
Git og GitHub er standarden i de fleste moderne udviklingsmiljøer, hvilket er min grund til, at bruge Git og Github.

---
### Kode eksempel:

```tsx
// - src/components/forms/edit/editInfoAction.ts
'use server'
import {z} from 'zod';
import {loginReturnProps, registerPropsState} from "@/types/LoginTypes";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

export async function editInfoAction(_prevState: registerPropsState, formData: FormData): Promise<registerPropsState> {
  const {email, password, firstname, lastname} = Object.fromEntries(formData)


  const register_schema = z.object({
    email: z.email().min(3, {error: "Du skal udfylde email"}).max(100, {error: "Email'en overskrider 100 karaktere."}),
    password: z.string().min(6, {error: "Du skal udfylde password"}),
    firstname: z.string().min(2, {error: "Du skal udfylde First Name"}).max(20, {error: "Dit navn overskrider 20 karatere"}),
    lastname: z.string().min(2, {error: "Du skal udfylde Last Name"}).max(30, {error: "Dit efternavn overskrider 20 karatere"}),
  })

  const validated = register_schema.safeParse({
    email,
    password,
    firstname,
    lastname
  })

  if (!validated.success) {
    const errorTree = z.treeifyError(validated.error)
    return {
      ...validated,
      errors: {
        email: errorTree.properties?.email?.errors,
        password: errorTree.properties?.password?.errors,
        firstname: errorTree.properties?.firstname?.errors,
        lastname: errorTree.properties?.lastname?.errors
      },
    }
  }

  try {
    const cookieStore = await cookies()
    const userID = cookieStore.get("userID")?.value
    const access_token = cookieStore.get("access_token")?.value
    if (userID) {
      const response = await fetch(process.env.API_URL + "users/" + userID, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        },
        method: "PUT",
        body: JSON.stringify(validated.data)
      })

      const renewAccessToken = await fetch(`${process.env.API_AUTH}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: validated.data.email,
          password: validated.data.password,
        })
      })

      const token_data: loginReturnProps = await renewAccessToken.json()

      cookieStore.set({
        name: "access_cookie",
        value: token_data.token,
        maxAge: Math.floor(token_data.validUntil / 1000)
      })
    }
  } catch (e) {
    return {
      success: false,
      message: (e as Error).message
    }
  } finally {
    revalidatePath("/profile")
  }

  return {
    success: true
  }
}
```


**Kode Forklaring:**
Dette er en Server Action, som tager mod to parameter og validere selve det
input har fået fra Formularen ved hjælp af zod. 

Udover spørger vi også om, hvis validation fejler
så skal returnere en fejl besked, hvilket også er kaldt en guard clause, hvis den selvfølig successfuld validation,
så går vi vidre til `try catch finally`. 

Derfefter fetcher jeg to endpoints, det første endpoint for opdatere dataen.
Det anden fetch retunere en ny cookie, med vores nye data, som vi kan sætte i vores cookie.
Hvis alt, at dette lykkes, så revalidere path, som invalidere selve cached fra profil siden
Hvis det ikke lykkes får vi en fejl besked.


## Valgfri opgave valg: C


### Design ændringer
Jeg har valgt at ændre på formularen, fordi jeg syntes at "Forget Password" ikke
passet til der, istedet for jeg lavet det til en interativ knap som kan skifte mellem
Login In og Sign up også fordi at man skal kunne opdatere sit password på profil siden
så personligt synes jeg selv at var en gentagelse som ikke helt passede til designet.




*Dokumentation fra Magnus*