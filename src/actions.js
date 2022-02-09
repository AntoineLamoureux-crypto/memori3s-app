import React from 'react';

function addMemo(event) {
    event.preventDefault()
    const newMemo = {
      title: memo.foodName,
      notes: memo.foodColor,
    };
    axios.post('/newMemo', newMemo)

    setMemo({
      title: "",
      notes: "",
      selectedFile: ""
    });
  }

  function deleteMemo(id) {
    axios.delete("/delete/" + id);
    alert("food deleted");
    console.log(`Deleted food with id ${id}`);
  }

  function updateMemo(id) {
    axios.put("/put/" + id, updatedFood);
    alert("food updated");
    console.log(`Memory with id ${id} updated`);
  }

export default {addMemo, deleteMemo, updateMemo}