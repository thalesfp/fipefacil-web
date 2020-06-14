import { useState, useEffect } from "react";

import normalizeReferenceDate from "../utils/normalizeReferenceDate";
import api from "../api/api";

function useReference() {
  const [reference, setReference] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await api.getCurrentReference();

        setReference(normalizeReferenceDate(result));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, reference };
}

export default useReference;
