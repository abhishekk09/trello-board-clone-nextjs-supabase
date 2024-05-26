"use client";
import React, { useState } from "react";
import Modal from "../Modal";
import { createNewBoard } from "../../action/action";
import { useRouter } from "next/navigation";

const CreateNewBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const createBoard = async (title: string) => {
    const res = await createNewBoard(title);
    if (!res.error) {
      const id = res[0].id;
      const header = res[0].title;
      router.push(`/board/${id}/${header}`);
    }
  };

  return (
    <main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={createBoard}
      />
      <div
        className="bg-green-100 w-[300px] py-12 rounded mb-2 pl-2 flex justify-center text-sm"
        onClick={() => setIsModalOpen(true)}
      >
        + Create new board
      </div>
    </main>
  );
};

export default CreateNewBoard;
