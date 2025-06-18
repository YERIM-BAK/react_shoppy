import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, getProducts as fetchProducts } from "../api/firebase";
import { useState } from "react";

export default function useProducts() {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState();
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60,
  });
  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setSuccess("성공적으로 제품이 추가되었습니다.");
      setTimeout(() => setSuccess(null), 4000);
    },
  });

  return { productsQuery, addProduct, success };
}
