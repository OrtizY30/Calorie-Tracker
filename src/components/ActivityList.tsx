import { useMemo } from "react";
import { Activity } from "../types";
import { categories } from "../data/db";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: React.Dispatch<ActivityActions>;
};

const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  const isEmptyActivities = activities.length === 0;
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>

      {isEmptyActivities ? (
        <p className="text-center mt-6">No hay actividades aún...</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 py-10 mt-5 bg-white flex justify-between shadow"
          >
            <div className="space-y-2 relative ">
              <p
                className={`absolute -top-8 -left-8 py-2 px-10 text-white uppercase font-bold ${
                  activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5 capitalize">
                {activity.name}
              </p>
              <p className="font-black text-4xl text-lime-500">
                {activity.calories} <span> Calorias</span>
              </p>
            </div>
            <div className="flex gap5 items-center">
              <button>
                <PencilSquareIcon
                  className="h-8 text-gray-800"
                  onClick={() =>
                    dispatch({
                      type: "save-activeId",
                      payload: { id: activity.id },
                    })
                  }
                />
              </button>
              <button>
                <XCircleIcon
                  className="h-8 text-red-500"
                  onClick={() =>
                    dispatch({
                      type: "delete-activity",
                      payload: { id: activity.id },
                    })
                  }
                />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ActivityList;
