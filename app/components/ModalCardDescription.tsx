"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { updateDescription } from "../action/action";

const ModalCardDescription = ({ cardId }) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      const { data, error } = await supabase
        .from("task_card")
        .select("*")
        .eq("id", cardId);

      if (!error) {
        setDescription(data[0].description);
      }
    };
    fetchDetail();
  }, []);

  const onClose = () => {
    router.back();
  };

  const onSave = async () => {
    const res = await updateDescription(description, cardId);
    if (!res.error) {
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  // if (!isOpen) return null;
  const router = useRouter();

  return (
    <div className="bg-white p-6 rounded shadow-lg w-80">
      <h2 className="text-xl font-bold mb-4">Enter Description</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter your description here"
        rows="4"
      />
      <div className="flex justify-end">
        <button
          onClick={onSave}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Add
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default ModalCardDescription;
