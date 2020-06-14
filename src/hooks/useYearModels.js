import { useState, useEffect } from "react";

import api from "../api/api";

const sortYearModels = (yearModels) =>
  yearModels.sort((modelA, modelB) => modelB.year - modelA.year);

function useYearModels(modelId) {
  const [yearModels, setYearModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await api.getYearModels(modelId);

        setYearModels(sortYearModels(result));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    modelId && fetchData();
  }, [modelId]);

  return { isLoading, yearModels };
}

export default useYearModels;
