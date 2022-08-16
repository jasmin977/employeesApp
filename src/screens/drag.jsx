import React, { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./drag.scss";
import Card from "./card";
function Drag() {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = cards.findIndex(
        (e) => e.id === source.droppableId
      );
      const destinationColIndex = cards.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = cards[sourceColIndex];
      const destinationCol = cards[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      cards[sourceColIndex].tasks = sourceTask;
      cards[destinationColIndex].tasks = destinationTask;
      setCards(cards);
    }
  };
  useEffect(() => {
    const fetchTASKS = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/task/cards/");
        setCards(response.data);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };

    fetchTASKS();
  }, []);
  if (loading)
    return (
      <div className="md:ml-64 flex items-center justify-center h-screen ">
        <TailSpin height="80" width="80" color="#136ABA" />
      </div>
    );
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {cards.map((section) => (
          <Droppable
            key={section.cardId}
            droppableId={`section-${section.cardId}`}
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                className="kanban_section"
                ref={provided.innerRef}
              >
                <div className="kanban_section_title">{section.cardName}</div>
                <div className="kanban_section_content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={`item-${task.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card>{task.text}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default Drag;
