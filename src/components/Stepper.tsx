import { useEffect, useRef, useState } from "react";

interface checkoutStep {
    name: string;
    component: () => JSX.Element;
}
interface Props {
    stepsConfig: checkoutStep[];
}
interface Margins {
    marginLeft: number|undefined;
    marginRight: number|undefined;
}
const arr : number[] = [1,2,4,5]

const CheckoutStepper = ({ stepsConfig }: Props) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isComplete, setIsComplete] = useState(false);
    const [margins,setMargins] = useState<Margins>({
        marginLeft : 0,
        marginRight: 0
    })

    const stepRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {  
        setMargins({
            marginLeft: (stepRef.current[0]?.offsetWidth?? 0)/2,
            marginRight :(stepRef.current[stepsConfig.length - 1]?.offsetWidth?? 0)/2
        })
    },[])

    if (!stepsConfig.length) {
        return <></>
    }
    const handleNext = () => {
        setCurrentStep((prevStep) => {
          if (prevStep === stepsConfig.length) {
            setIsComplete(true);
            return prevStep;
          } else {
            return prevStep + 1;
          }
        });
      };
    const calculateProgressBarWidth = () => {
        return ((currentStep -1) / (stepsConfig.length -1)) *100;
    }

    const AcitveComponent =  stepsConfig[currentStep - 1]?.component;
    
    return (
        <>
            <div className="stepper">
                {stepsConfig.map((step, index) => (
                    <div className={
                        `step ${currentStep > index + 1 || isComplete ? "complete" : ""}
                        ${currentStep === index + 1 ? "active" : ""}`
                    }
                        ref ={(el) => (stepRef.current[index] = el)}
                        key={index}>
                        <div className="step-number">
                            {currentStep > index +1 ? <span>&#10003;</span> : index+1}
                        </div>
                        <div className="step-name">{step.name}</div>
                    </div>
                ))}
                <div className="progress-bar"
                 style={{
                    width: `calc(100% - ${(margins?.marginLeft || 0) + (margins?.marginRight || 0)}px)`,
                    marginLeft: margins.marginLeft,
                    marginRight: margins.marginRight,
                  }}>
                    <div className="progress" style={{width :`${calculateProgressBarWidth()}%`}}></div>
                </div>

            </div>
            {<AcitveComponent />}
            {!isComplete && (
                <button onClick={handleNext} className="btn">{currentStep === stepsConfig.length ? "Finished" : "Next"}</button>
            )}
        </>

    );
}

export default CheckoutStepper;
