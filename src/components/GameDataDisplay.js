import { eduSABegginer, slikScreen } from '@/app/layout';
import React, { useEffect, useState } from 'react'
import styles from './GameDataDisplay.module.css'
import InteractableOptionItem from './gamePrompts/InteractableOptionItem';
import { conditionalText, showConditionalButtons } from '../../gameUtils/gameDisplayLogic';
import Inventory from './inventory/Inventory';
import { addItemToInventory, updateItemInInventory } from '../../gameUtils/localStorageUtils';
import { ITEMS_ACTIONS_MATRIX } from '../../gameUtils/itemActionsMatrix';
import DialogueManager from '@/classes/DialogueManager';

const styles2 = { width: "800px", height: "100%" };

const GameDataDisplay = ({ ...props }) => {
    const { boundaryInstance } = props;
    const [additionalText, setAdditionalText] = useState("");
    const { showInventory } = props;
    const dialogueManager = new DialogueManager();
    const [textOptions, setTextOptions] = useState([]);

    useEffect(() => {
        setAdditionalText("");

        // const dialogueOptions = boundaryInstance?.loadDialogueDataForLevel(boundaryInstance.level);
        const dialogueOptions = dialogueManager.loadDialogueDataForLevel(boundaryInstance?.level, boundaryInstance?.dialogueIdentifier);

        setTextOptions(dialogueOptions)

    }, [props.showGameDataDisplay])



    const optionsSelected = (option) => {
        console.log("option selceted = ", option.action);

        //determine what option was selected, then handle the function call on either the instance or locally
        switch (option.action) {
            case "readItem": {
                console.log("read called + dialogueData = ", option);
                setAdditionalText(option.response);
                // get the
                break;
            }
            case "leaveItem": {
                console.log("leave called + dialogueData = ", option);
                setAdditionalText(option.response);
                // get the
                break;
            }
            case "takeItem": {
                console.log("take called + dialogueData = ", option);
                setAdditionalText(option.response);
                boundaryInstance[option.action](textOptions.lootableItem);
                
                break;
            }
            case "useItem": {
                console.log("use called + dialogueData = ", option);
                setAdditionalText(option.response);
                boundaryInstance[option.action](textOptions.keyRequired);
                
                break;
            }

        }

        // now what? fire that action on the instance
        


    }

    return (

        <div style={styles2}>
            <h1 className={slikScreen.className} style={{ color: "greenyellow" }}>{props?.title}</h1>
            <div style={{ border: "1px solid blue", display: "flex" }}>
                {
                    showInventory &&
                    <div style={{ marginRight: "20px", border: "1px solid red", width: "50%" }}>
                        <Inventory boundaryInstance={boundaryInstance} closeInventory={props.closeInventory} />
                    </div>
                }

                {props.showGameDataDisplay &&
                    <div style={{ marginRight: "20px", width: showInventory ? "40%" : "100%" }}>
                        <p style={{ fontSize: "30px", marginTop: "30px" }} id="description" className={eduSABegginer.className}>{textOptions?.question || textOptions}</p>
                        {/* <p style={{ fontSize: "30px", marginTop: "30px" }} id="description" className={eduSABegginer.className}>{ITEMS_ACTIONS_MATRIX[matrixName].text(boundaryInstance.interactionData.type, boundaryInstance.interactionData.textOptions, matrixName)}</p> */}

                        {
                            textOptions?.options?.map((option, index) => (
                                <InteractableOptionItem option={option} key={index} optionsSelected={optionsSelected} />
                            ))
                        }
                        <p style={{ fontSize: "30px", marginTop: "30px", color: "lightgreen" }} className={eduSABegginer.className}>{additionalText}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default GameDataDisplay