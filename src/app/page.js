"use client"
import Canvas from "@/components/Canvas";
import GameDataDisplay from "@/components/GameDataDisplay";
import { useMemo, useRef, useState } from "react";

export default function Home() {

  const [interactionData, setInteractionData] = useState(null);
  const [showGameDataDisplay, setShowGameDataDisplay] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [boundaryInstance, setBoundaryInstance] = useState(null);

  const handleInteraction = (boundary) => { // Boundary instance
    setShowGameDataDisplay(true);
    setInteractionData(boundary.interactionData);
  }

  const closeInteractionDisplay = () => {
    setShowGameDataDisplay(false);
    setInteractionData(null);
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
    <div style={{
      display: "flex",
      border: "1px solid red",
      margin: "60px auto"
    }}>
      {canvas}
      <GameDataDisplay title="Level 1 - The Basement" interactionData={interactionData} showGameDataDisplay={showGameDataDisplay} showInventory={showInventory} boundaryInstance={boundaryInstance} closeInventory={closeInventory}/>
    </div>
  )
}
