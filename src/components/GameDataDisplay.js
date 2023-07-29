import { eduSABegginer, slikScreen } from '@/app/layout';
import React, { useEffect, useMemo, useState } from 'react'
import styles from './GameDataDisplay.module.css'
import InteractableOptionItem from './gamePrompts/InteractableOptionItem';
import Inventory from './inventory/Inventory';

import DialogueManager from '@/classes/DialogueManager';
import GameStateManager from '@/classes/GameStateManager';

const styles2 = { width: "800px", height: "100%", };

const GameDataDisplay = ({ ...props }) => {
    const { boundaryInstance } = props;
    const [additionalText, setAdditionalText] = useState("");
    const { showInventory } = props;
    const dialogueManager = new DialogueManager();
    const [textOptions, setTextOptions] = useState([]);
    const [showGameDataDisplay, setShowGameDataDisplay] = useState(false);
    const [loadNextText, setLoadNextText] = useState(false);

    const getTextOptions = () => {
        if(loadNextText && props.showGameDataDisplay){
            setAdditionalText(loadNextText)
        }

        if(!props.showGameDataDisplay){
            // display closed. Reset the additionalText amd loadNextValue.
            setAdditionalText("");
            setLoadNextText(false);
        }
        const dialogueOptions = dialogueManager.loadDialogueDataForLevel(boundaryInstance?.level, boundaryInstance?.dialogueIdentifier);
        setTextOptions(dialogueOptions);
    }

    useEffect(() => {
        setAdditionalText("");
        getTextOptions();
        setShowGameDataDisplay(props.showGameDataDisplay);
    }, [props.showGameDataDisplay, loadNextText])


    const clearStorage = () => {
        // TODO remove
        const gameStateManager = new GameStateManager();
        gameStateManager.delete()

    }

    const useItemCallback = () => {}


    const optionsSelected = (option) => {
        switch (option.action) {
            case "readItem": {
                console.log("read called + dialogueData = ", option);
                setAdditionalText(option.response);
                break;
            }
            case "leaveItem": {
                console.log("leave called + dialogueData = ", option);
                setAdditionalText(option.response);
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
                boundaryInstance[option.action](textOptions.keyRequired, useItemCallback);
                setLoadNextText(option.response);
                break;
            }
        }

        if (option !== "useItem") {
            setShowGameDataDisplay(false);
        }
    }

    return (
            <div style={styles2}>
                    <button onClick={clearStorage}>Clear storage</button>
                    <h1 className={slikScreen.className} style={{ color: "greenyellow" }}>{props?.title}</h1>
                    <div style={{ border: "1px solid blue", display: "flex" }}>
                        {showInventory &&
                            <div style={{ marginRight: "20px", border: "1px solid red", width: "50%" }}>
                                <Inventory boundaryInstance={boundaryInstance} closeInventory={props.closeInventory} />
                            </div>}

                        <div style={{ marginRight: "20px", width: showInventory ? "40%" : "100%" }}>

                            {showGameDataDisplay &&
                                <>
                                    <p style={{ fontSize: "30px", marginTop: "30px" }} id="description" className={eduSABegginer.className}>{textOptions?.question || textOptions}</p>
                                    {textOptions?.options?.map((option, index) => (
                                        <InteractableOptionItem option={option} key={index} optionsSelected={optionsSelected} />
                                    ))}
                                </>}

                        </div>
                    </div>
                <p style={{ fontSize: "30px", marginTop: "30px", color: "lightgreen" }} className={eduSABegginer.className}>{additionalText}</p>
            </div>
    )
}

export default GameDataDisplay