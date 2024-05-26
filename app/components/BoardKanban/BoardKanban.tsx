"use client";
import React, { useState, useEffect } from "react";
import TaskHeader from "../TaskHeader";
import { supabase } from "../../lib/supabaseClient";

const BoardKanban = ({ params }) => {
  const [boardStates, setBoardStates] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let { data: boardStates, error } = await supabase
        .from("board_states")
        .select("*")
        .eq("board_id", params.boardId);

      if (error) {
        console.error("Error fetching cards:", error);
      } else {
        setBoardStates(boardStates);
      }
    };
    // Call the async function
    fetchData();
  }, []);
  return (
    <div>
      {boardStates.map((bs, index) => (
        <div key={index + ""}>
          <div>
            <TaskHeader data={bs} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardKanban;
