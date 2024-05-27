"use server";

import { supabase } from "../lib/supabaseClient";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export const getBoardList = async () => {
  let { data: boards, error } = await supabase.from("boards").select("*");
  revalidatePath(`/`);
  return boards;
};

export const getCardList = async (id, boardname) => {
  let { data: boardStates, error } = await supabase
    .from("board_states")
    .select("*")
    .eq("board_id", id);

  return { boardStates, error };
  //   revalidatePath(`/board/${boardId}/${boardname}`);
};
export const addColumn = async (formData) => {
  const title = formData.get("title");
  const boardId = formData.get("boardId");
  const boardname = formData.get("boardname");
  const { data, error } = await supabase
    .from("board_states")
    .insert([{ title: title, board_id: boardId }])
    .select("*");
  console.log(data, error, "herer123123");
  // revalidatePath(`/board/${boardId}/${boardname}`);
  return { data, error };
};

export const createNewBoard = async (title) => {
  const { data: boards, error } = await supabase
    .from("boards")
    .insert([{ title: title }])
    .select();

  if (error) {
    console.log(error);
  } else {
    revalidatePath("/");
    return boards;
    // redirect(`/board/${boards.id}`);
  }
};

export const addCard = async (formData, params) => {
  const title = formData.get("card");
  const boardId = formData.get("boardId");
  const { data, error } = await supabase
    .from("task_card")
    .insert([{ title: title, board_state_id: boardId }])
    .select("*");

  revalidatePath(`/board/${params.boardId}/${params.boardname}`);
  return { data, error };
};

export const updateCard = async (formData) => {
  const title = formData.get("title");
  const boardId = formData.get("boardId");
  const id = formData.get("id");
  const boardname = formData.get("boardname");

  const { data, error } = await supabase
    .from("board_states")
    .update({ title: title })
    .eq("id", id)
    .select();

  return { data, error };
  // revalidatePath(`/board/${boardId}/${boardname}`, "page");
};

export const updateDescription = async (description, selectedId) => {
  const { data, error } = await supabase
    .from("task_card")
    .update({ description: description })
    .eq("id", selectedId)
    .select();

  return { data, error };
  // revalidatePath(`/board/${boardId}/${boardname}`, "page");
  //   redirect(`/board/${boardId}/${boardname}`);
  //   console.log(data, "addColumnDATA123 data");
};
export const updateTaskItem = async ({ id, bsId, params }) => {
  const { data, error } = await supabase
    .from("task_card")
    .update({ board_state_id: bsId })
    .eq("id", id)
    .select();
  return { data, error };
};
