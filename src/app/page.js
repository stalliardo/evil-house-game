"use client"
import Canvas from "@/components/Canvas";
import GameDataDisplay from "@/components/GameDataDisplay";
import { useMemo, useRef, useState } from "react";

export default function Home() {

  const [interactionData, setInteractionData] = useState(null);
  const [showGameDataDisplay, setShowGameDataDisplay] = useState(false);
 
  const handleInteraction = (boundary) => { // Boundary instance
    setShowGameDataDisplay(true);
    setInteractionData(boundary.interactionData);
  }

  const closeInteractionDisplay = () => {
    setShowGameDataDisplay(false);
    setInteractionData(null);
  }

  // useMemo used here to prevent the Canvas comp from re-rendering when setState is called
  const canvas = useMemo(() => <Canvas onInteraction={handleInteraction} closeInteractionDisplay={closeInteractionDisplay} />, []);

  return (
    <div style={{
      display: "flex",  
      border: "1px solid red",
      margin: "60px auto"
    }}>
      {canvas}
      <GameDataDisplay title="Level 1 - The Basement" interactionData={interactionData} showGameDataDisplay={showGameDataDisplay}/>
    </div>
  )
}
