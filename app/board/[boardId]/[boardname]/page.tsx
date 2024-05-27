"use client";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { getCardList, updateTaskItem } from "../../../action/action";

import React, { useEffect, useState } from "react";
import CreateColumn from "../../../components/forms/CreateColumn";
import CreateTaskList from "../../../components/CreateTaskList";

import TaskHeader from "../../../components/TaskHeader";
import { useRouter } from "next/navigation";

export default function BoardDetails({ params }) {
  const [state, setState] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const router = useRouter();
  const { boardname, boardId } = params;
  // console.log(router, "router");

  const fetchData = async () => {
    const res = await getCardList(params.boardId, params.boardname);

    const { boardStates = [], error } = res;
    if (error) {
      console.error("Error fetching cards:", error);
    } else {
      setState(boardStates);
    }
  };

  const updateTaskList = async (id, bsId) => {
    const obj = {
      id: id,
      bsId: bsId,
      params: params,
    };

    const res = await updateTaskItem(obj);
    const { data = [], error } = res;
    if (error) {
      console.error("Error fetching cards:", error);
    } else {
      setRefreshList(true);
    }
  };

  const onCallBack = () => {
    setRefreshList(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // function moveElement(array, fromIndex, toIndex) {
  //   // if (fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
  //   //   throw new Error("Invalid indices");
  //   // }

  //   const element = array[fromIndex];
  //   const newArray = array.slice(); // Create a copy of the array

  //   // Remove the element from the original position
  //   newArray.splice(fromIndex, 1);

  //   // Insert the element at the new position
  //   newArray.splice(toIndex, 0, element);

  //   return newArray;
  // }

  async function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = source.droppableId;
    const dInd = destination.droppableId;
    if (sInd === dInd) {
      // alert("reorder");
    } else {
      // alert("move element");
      updateTaskList(result.draggableId, destination.droppableId);
    }
  }

  return (
    <main>
      <div className="flex text-lg font-bold w-full h-[50px] bg-[#f1f2f1] rounded p-4 mb-8 justify-center">
        {boardname}
      </div>
      <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
        <div className="flex flex-row gap-8 m-8">
          {state.map((bs, index) => (
            <Droppable key={index.toString()} droppableId={`${bs.id}`}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  key={String(index)}
                  className="bg-[#f1f2f1] rounded p-4"
                >
                  <div>
                    <TaskHeader data={bs} params={params} />
                  </div>
                  <CreateTaskList
                    id={bs.id}
                    params={params}
                    providedParent={provided}
                    refreshList={refreshList}
                    onCallBack={onCallBack}
                  />
                </div>
              )}
            </Droppable>
          ))}

          <CreateColumn boardId={params.boardId} boardname={params.boardname} />
        </div>
      </DragDropContext>
    </main>
  );
}
