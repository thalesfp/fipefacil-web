import { useState, useEffect } from "react";

import api from "../api/api";

const sortModels = (models) =>
  models.sort((modelA, modelB) => modelA.name.localeCompare(modelB.name));

function useModels(brandId) {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disableModelSelect, setDisableModelSelect] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setDisableModelSelect(true);

      try {
        const result = await api.getModels(brandId);

        setModels(sortModels(result));
      } catch (error) {
        console.log(error);
      } finally {
        setDisableModelSelect(false);
        setIsLoading(false);
      }
    };

    brandId ? fetchData() : setDisableModelSelect(true);
  }, [brandId]);

  return { isLoading, disableModelSelect, models };
}

export default useModels;
