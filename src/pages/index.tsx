import { axiosInstance } from "@/axios/AxiosInstance";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,

  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

type Product = {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
};

export default function Home() {
  const getProducts = async (): Promise<Product[]> => {
    try {
      const { data } = await axiosInstance.get("/products");
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" color="blue.500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
        {products?.map((product) => (
          <Card key={product.id} className="w-80 h-auto flex flex-col">
            <CardBody className="flex flex-col items-center">
              <Image
                className="w-64 h-64 object-cover"
                src={product.image}
                alt={product.title}
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3" className="text-center">
                <Heading size="md">{product.title}</Heading>
                <Text className="line-clamp-3">{product.description}</Text>
                <Text color="blue.600" fontSize="2xl">
                  ${product.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center">
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue">
                  Buy now
                </Button>
                <Button variant="ghost" colorScheme="blue">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}
