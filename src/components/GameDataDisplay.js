import { eduSABegginer, slikScreen } from '@/app/layout';
import React, { useEffect, useState } from 'react'
import styles from './GameDataDisplay.module.css'
import InteractableOptionItem from './gamePrompts/InteractableOptionItem';
import { conditionalText, showConditionalButtons } from '../../gameUtils/gameDisplayLogic';

const styles2 = { width: "800px", height: "100%" };


const GameDataDisplay = ({ ...props }) => {
    useEffect(() => {
        setAdditionalText("");
    }, [props.showGameDataDisplay])

    // Display a heading if provided  
    const { interactionData } = props;
    const [additionalText, setAdditionalText] = useState("");

    const optionsSelected = (option) => {
        
        const callback = interactionData.callbacks.find((item) => item.type === option);

        console.log("callback = ", callback);

        if (callback) {
            let callBackText = "";
            if(callback.action.length) {// is an array
                callback.action[0](); // call the function at index 0;
                callBackText = callback.action[1]; // the second element will always be text
            } else {
                callBackText = callback.action();
            }

            setAdditionalText(callBackText);
        }
    }


    return (
        <div style={styles2}>
            <h1 className={slikScreen.className} style={{ color: "greenyellow" }}>{props?.title}</h1>


            {
                props.showGameDataDisplay &&
                <>
                    <p style={{ fontSize: "30px", marginTop: "30px" }} id="description" className={eduSABegginer.className}>{conditionalText(interactionData?.text)}</p>

                    {
                        showConditionalButtons(interactionData?.text) ? <div className={styles.optionsContainer}>
                        {
                            // only want to run this if the conditional returns
                            interactionData?.interactionOptions?.map((option, index) => (
                                <InteractableOptionItem text={option} key={index} optionsSelected={optionsSelected} />
                            ))
                        }
                    </div> : null
                    }
                    <p style={{ fontSize: "30px", marginTop: "30px", color: "lightgreen" }} className={eduSABegginer.className}>{additionalText}</p>
                </>
            }

        </div>
    )
}

export default GameDataDisplay