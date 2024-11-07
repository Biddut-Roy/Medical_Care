type IoOption = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};
type IOptionResults = {
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: string;
};

const calculatePagination = (option: IoOption): IOptionResults => {
  const page: number = Number(option.page) || 1;
  const limit: number = Number(option.limit) || 10;
  const skip: number = Number(Number(page) - 1) * limit;

  const sortBy: string = option.sortBy || "createdAt";
  const sortOrder: string = option.sortOrder || "ase";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default calculatePagination;
