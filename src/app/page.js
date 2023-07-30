"use client"
import Canvas from "@/components/Canvas";
import GameDataDisplay from "@/components/GameDataDisplay";
import { useMemo, useRef, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";

export default function Home() {

  const [showGameDataDisplay, setShowGameDataDisplay] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [boundaryInstance, setBoundaryInstance] = useState(null);

  const handleInteraction = (interactedBoundary) => { // Boundary instance
    setShowGameDataDisplay(true);
    setBoundaryInstance(interactedBoundary)
  }

  const closeInteractionDisplay = () => {
    setShowGameDataDisplay(false);
    setBoundaryInstance(null);
  }

  const onShowInventory = (interactedBoundary = null) => {
    setShowInventory((prev) => !prev);
    if (interactedBoundary) {
      setBoundaryInstance(interactedBoundary)
    } else {
      setBoundaryId(null);
    }
  }

  const closeInventory = () => {
    setShowInventory(false);
  }

  // useMemo used here to prevent the Canvas comp from re-rendering when setState is called
  const canvas = useMemo(() => <Canvas onInteraction={handleInteraction} closeInteractionDisplay={closeInteractionDisplay} showInventory={onShowInventory} closeInventory={closeInventory} />, []);

  return (
    <Provider store={store}>
      <div style={{
        display: "flex",
        border: "1px solid red",
        margin: "60px auto"
      }}>
        {canvas}
        <GameDataDisplay title="Level 1 - The Basement" showGameDataDisplay={showGameDataDisplay} showInventory={showInventory} boundaryInstance={boundaryInstance} closeInventory={closeInventory} />
      </div>
    </Provider>
  )
}
