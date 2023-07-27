import { eduSABegginer, slikScreen } from '@/app/layout';
import React, { useEffect, useState } from 'react'
import styles from './GameDataDisplay.module.css'
import InteractableOptionItem from './gamePrompts/InteractableOptionItem';
import { conditionalText, showConditionalButtons } from '../../gameUtils/gameDisplayLogic';
import Inventory from './inventory/Inventory';
import { addItemToInventory, updateItemInInventory } from '../../gameUtils/localStorageUtils';
import { ITEMS_ACTIONS_MATRIX } from '../../gameUtils/itemActionsMatrix';

const styles2 = { width: "800px", height: "100%" };

const GameDataDisplay = ({ ...props }) => {
    useEffect(() => {
        setAdditionalText("");
    }, [props.showGameDataDisplay])

    const { boundaryInstance } = props;
    const [additionalText, setAdditionalText] = useState("");
    const { showInventory } = props;

    const matrixName = boundaryInstance?.name;

    const optionsSelected = (option) => {

        switch (option) {
            case "Take":
                const name = ITEMS_ACTIONS_MATRIX[matrixName].name  || ITEMS_ACTIONS_MATRIX[boundaryInstance.interactionData.lootables].name;
                let mName = boundaryInstance.interactionData.lootables;

                if(ITEMS_ACTIONS_MATRIX[matrixName].requiresKey) {
                    updateItemInInventory({name: boundaryInstance.name, value: "looted"});
                }
                
                addItemToInventory({ name, matrixName: mName });
                setAdditionalText(ITEMS_ACTIONS_MATRIX[matrixName].lootedText);
                
                // close buttons
                break;
            case "Read":
                const text = boundaryInstance.getDisplayText();
                setAdditionalText(text);
                break;
        }
    }

    return (
        <div style={styles2}>
            <h1 className={slikScreen.className} style={{ color: "greenyellow" }}>{props?.title}</h1>
            <div style={{ border: "1px solid blue", display: "flex" }}>
                {
                    showInventory &&
                    <div style={{ marginRight: "20px", border: "1px solid red", width: "50%" }}>
                        <Inventory boundaryInstance={props.boundaryInstance} closeInventory={props.closeInventory} />
                    </div>
                }

                {props.showGameDataDisplay &&
                    <div style={{ marginRight: "20px", width: showInventory ? "40%" : "100%" }}>
                        {/* <p style={{ fontSize: "30px", marginTop: "30px" }} id="description" className={eduSABegginer.className}>{boundaryInstance.text}</p> */}
                        <p style={{ fontSize: "30px", marginTop: "30px" }} id="description" className={eduSABegginer.className}>{ITEMS_ACTIONS_MATRIX[matrixName].text(boundaryInstance.interactionData.type, boundaryInstance.interactionData.textOptions, matrixName)}</p>

                        {
                            showConditionalButtons(ITEMS_ACTIONS_MATRIX[matrixName], matrixName, ITEMS_ACTIONS_MATRIX[matrixName].name) ? <div className={styles.optionsContainer}>
                                {
                                    // only want to run this if the conditional returns
                                    boundaryInstance.interactionData?.interactionOptions?.map((option, index) => (
                                        <InteractableOptionItem text={option} key={index} optionsSelected={optionsSelected} />
                                    ))
                                }
                            </div> : null
                        }
                        <p style={{ fontSize: "30px", marginTop: "30px", color: "lightgreen" }} className={eduSABegginer.className}>{additionalText}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default GameDataDisplay