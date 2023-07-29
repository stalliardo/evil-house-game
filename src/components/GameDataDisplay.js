import { eduSABegginer, slikScreen } from '@/app/layout';
import React, { useEffect, useMemo, useState } from 'react'
import styles from './GameDataDisplay.module.css'
import InteractableOptionItem from './gamePrompts/InteractableOptionItem';
import { conditionalText, showConditionalButtons } from '../../gameUtils/gameDisplayLogic';
import Inventory from './inventory/Inventory';
import { addItemToInventory, updateItemInInventory } from '../../gameUtils/localStorageUtils';
import { ITEMS_ACTIONS_MATRIX } from '../../gameUtils/itemActionsMatrix';
import DialogueManager from '@/classes/DialogueManager';
import GameStateManager from '@/classes/GameStateManager';
import AdditionalTextHandler from './gamePrompts/AdditionalTextHandler';
import { BASEMENT_DIALOGUE_DATA } from '../../gameUtils/dialogue/basementDialogueData';

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
        if(loadNextText){
            console.log("if called");
            setAdditionalText(loadNextText)
        }
        const dialogueOptions = dialogueManager.loadDialogueDataForLevel(boundaryInstance?.level, boundaryInstance?.dialogueIdentifier);
        setTextOptions(dialogueOptions);

    }

    useEffect(() => {
        setAdditionalText("");

        // const dialogueOptions = boundaryInstance?.loadDialogueDataForLevel(boundaryInstance.level);

        getTextOptions();

        setShowGameDataDisplay(props.showGameDataDisplay);



    }, [props.showGameDataDisplay, loadNextText])


    const clearStorage = () => {
        // TODO remove
        const gameStateManager = new GameStateManager();
        gameStateManager.delete()

    }

    const testFunction = () => {
        // just reloading the page should load the next text
        // how am i gonna get the next text without rra
        // now display the callback button

        
        // also need to set the addtionalText as its getting overridden
        
        // setTextOptions({
        //     itemOpenedQuestion: "There is a basement key hanging inside. What will you do?",
        // itemOpenedOptions: [
        //     {
        //         text: "Take the basement key", action: "takeItem", response: "You take the basement key and put it in your inventory."
        //     },
        //     {
        //         text: "Leave the basement key", action: "leaveItem", response: "You decide to leave the basement key for now."
        //     }
        // ],
        // })

    }


    const optionsSelected = (option) => {

        //determine what option was selected, then handle the function call on either the instance or locally


        // after most actions i will wamt to close the text and buttons but still displat the response text
        // how will this be acheieved




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
                boundaryInstance[option.action](textOptions.keyRequired, testFunction);
                setLoadNextText(option.response);
                // now need to call a call back that loads the next text in the
                break;
            }

        }

        // TODO call this for all except use

        if (option !== "useItem") {
            setShowGameDataDisplay(false);
        }

        // now what? fire that action on the instance



    }

    return (
            <div style={styles2}>
                <AdditionalTextHandler loadNextText={loadNextText}>
                    {console.log("%cRendered top", "color:red")}
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
                </AdditionalTextHandler>
                <p style={{ fontSize: "30px", marginTop: "30px", color: "lightgreen" }} className={eduSABegginer.className}>{additionalText}</p>
            </div>
    )
}

export default GameDataDisplay