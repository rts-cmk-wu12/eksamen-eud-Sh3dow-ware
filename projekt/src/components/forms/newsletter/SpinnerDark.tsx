import {SpinnerCircularFixed} from 'spinners-react';
import "./Spinner.sass"

const SpinnerDark = () => {
  const color = "#232323"
  const secondaryColor = "#c2c2c2"
  return (
      <>
        <div className={"circular-spinner"}>
          <SpinnerCircularFixed size={50} thickness={100} speed={100} color={color}
                                secondaryColor={secondaryColor}/>
        </div>
      </>
  );
};

export default SpinnerDark