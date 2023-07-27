import { eduSABegginer, slikScreen } from '@/app/layout';
import React, { useEffect, useState } from 'react'
import styles from './GameDataDisplay.module.css'
import InteractableOptionItem from './gamePrompts/InteractableOptionItem';
import { conditionalText, showConditionalButtons } from '../../gameUtils/gameDisplayLogic';
import Inventory from './inventory/Inventory';
import { addItemToInventory } from '../../gameUtils/localStorageUtils';
import { ITEMS_ACTIONS_MATRIX } from '../../gameUtils/itemActionsMatrix';

const styles2 = { width: "800px", height: "100%" };

const GameDataDisplay = ({ ...props }) => {
    useEffect(() => {
        setAdditionalText("");
    }, [props.showGameDataDisplay])

    const { boundaryInstance } = props;
    const [additionalText, setAdditionalText] = useState("");
    const { showInventory } = props;

    const optionsSelected = (option) => {

        switch (option) {
            case "Take":
                const name = ITEMS_ACTIONS_MATRIX[boundaryInstance.interactionData.lootables].name // ie Paper Clip
                const matrixName = boundaryInstance.interactionData.lootables; // ie basemnetPaperClip

                addItemToInventory({ name, matrixName });
                setAdditionalText(boundaryInstance.interactionData.lootedText);

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
                        <p style={{ fontSize: "30px", marginTop: "30px" }} id="description" className={eduSABegginer.className}>{boundaryInstance.text}</p>

                        {
                            showConditionalButtons(boundaryInstance.interactionData?.lootables) ? <div className={styles.optionsContainer}>
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