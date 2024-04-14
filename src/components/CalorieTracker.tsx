import { useMemo } from "react";
import { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  // Contadores
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  )
  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Caloria
      </h2>
      <div className=" flex flex-col md:flex-row items-center justify-between gap-5 mt-10">

     <CalorieDisplay
     calories={caloriesConsumed}
     text='Consumidas'
     />
     <CalorieDisplay
     calories={caloriesBurned}
     text='Ejercicio'
     />
     <CalorieDisplay
     calories={netCalories}
     text='Diferencia'
     />
      </div>
    </>
  );
};

export default CalorieTracker;
