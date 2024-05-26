// import React from 'react'
import { supabase } from "../lib/supabaseClient";

interface BoardNavBarProps {
  BoardId: string;
}
export default async function BoardNavBar({ BoardId }: BoardNavBarProps) {
  let { data: title, error } = await supabase
    .from("boards")
    .select("title")
    .eq("id", BoardId);

  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed flex item-center justify-center px-6 gap-x-4 text-white py-4">
      <div>{title[0]?.title}</div>
    </div>
  );
}
