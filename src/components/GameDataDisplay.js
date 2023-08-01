import { eduSABegginer, slikScreen } from '@/app/layout';
import React, { useEffect, useMemo, useState } from 'react'
import InteractableOptionItem from './gamePrompts/InteractableOptionItem';
import Inventory from './inventory/Inventory';
import DialogueManager from '@/classes/DialogueManager';
import GameStateManager from '@/classes/GameStateManager';
import { useDispatch, useSelector } from 'react-redux';
import { updateLevelData } from '@/features/gameState/gameStateSlice';
import { levelLoader } from '../../gameUtils/levelLoader';
import TextModal from './modal/TextModal';
import { loadModal, setTextAndDisplay } from '@/features/gameState/modalSlice';
import { MODAL_TEXT } from '../../gameUtils/consts';

const GameDataDisplay = ({ ...props }) => {
    const { boundaryInstance } = props;
    const [additionalText, setAdditionalText] = useState("");
    const { showInventory } = props;
    const dialogueManager = new DialogueManager();
    const gameStateManager = new GameStateManager();
    const [textOptions, setTextOptions] = useState([]);
    const [showGameDataDisplay, setShowGameDataDisplay] = useState(false);
    const [loadNextText, setLoadNextText] = useState(false);
    const showModal = useSelector((state) => state.modal.isOpen);
    const dispatch = useDispatch();

    const getTextOptions = () => {
        if (loadNextText && props.showGameDataDisplay) {
            setAdditionalText(loadNextText)
        }

        if (!props.showGameDataDisplay) {
            setAdditionalText("");
            setLoadNextText(false);
        }
        const dialogueOptions = dialogueManager.loadDialogueDataForLevel(boundaryInstance?.level, boundaryInstance);
        setTextOptions(dialogueOptions);
    }

    // TODO - reinstate
    // useEffect(() => {
    //     const hasPlayedPreviously = gameStateManager.has("level");
    //     if (!hasPlayedPreviously) { // is players first time
    //         dispatch(
    //             loadModal({
    //                 text: MODAL_TEXT.ENTER_GAME_TEXT,
    //                 confirmButtonText: "Let the nightmare begin",
    //                 confirmCallback: "close"
    //             })
    //         )
    //     }
    // }, [])

    useEffect(() => {
        setAdditionalText("");
        getTextOptions();
        setShowGameDataDisplay(props.showGameDataDisplay);

    }, [props.showGameDataDisplay, loadNextText])


    const clearStorage = () => {
        // TODO remove

        gameStateManager.delete()

    }

    const updateLevelState = () => {
        dispatch(updateLevelData());
    }

    const optionsSelected = (option) => {
        switch (option.action) {
            case "readItem": {
                dispatch(loadModal({
                    text: option.response,
                    confirmButtonText: "close",
                    confirmCallback: "close"
                }))
                break;
            }
            case "leaveItem": {
                setAdditionalText(option.response);
                break;
            }
            case "takeItem": {
                setAdditionalText(option.response);
                boundaryInstance[option.action](textOptions.lootableItem);
                break;
            }
            case "useItem": {
                boundaryInstance[option.action](textOptions.keyRequired);
                setLoadNextText(option.response);
                break;
            }
            case "changeLevel": {
                boundaryInstance[option.action](textOptions.levelName, updateLevelState);
                break;
            }
        }

        if (option !== "useItem") {
            setShowGameDataDisplay(false);
        }
    }

    return (
        <>
            <div style={{ width: "800px", height: "100%" }}>
                <button onClick={clearStorage}>Clear storage</button>
                <h1 className={slikScreen.className} style={{ color: "greenyellow" }}>{levelLoader().level}</h1>
                <div style={{ display: "flex" }}>
                    {showInventory &&
                        <div style={{ marginRight: "20px", width: "50%" }}>
                            <Inventory boundaryInstance={boundaryInstance} closeInventory={props.closeInventory} />
                        </div>}

                    <div style={{ marginRight: "20px", width: showInventory ? "40%" : "100%" }}>

                        {showGameDataDisplay &&
                            <>
                                <p style={{ fontSize: "30px", marginTop: "30px" }} id="description" className={eduSABegginer.className}>{textOptions?.question || textOptions}</p>
                                <div style={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
                                    {textOptions?.options?.map((option, index) => (
                                        <InteractableOptionItem option={option} key={index} optionsSelected={optionsSelected} />
                                    ))}
                                </div>
                            </>}

                    </div>
                </div>
                <p style={{ fontSize: "30px", marginTop: "30px", color: "lightgreen" }} className={eduSABegginer.className}>{additionalText}</p>
            </div>
            {
                showModal ? <TextModal /> : null
            }
        </>
    )
}

export default GameDataDisplay