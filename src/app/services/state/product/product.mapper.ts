import { InitPagination } from '../../../models/pagination.model';
import { IProduct, ProductResponse, Rating } from '../../../models/product.model';
import { GetFilteredProductQuery_findProducts } from './__generated__/GetFilteredProductQuery';

export function FilteredProductUIMapper(
  response: GetFilteredProductQuery_findProducts | null
): ProductResponse {
  const result: ProductResponse = {
    data: [],
    pagination: InitPagination,
  };
  if (!!response) {
    if (response.data?.length) {
      response.data.forEach((element) => {
        if (element) {
          const ratings: Rating[] = element.ratings
            ? element.ratings.map((element) => ({
                name: element?.name,
                review: element?.review,
                rate: element?.rate,
                createdDate: element?.createdDate,
                headLine: element?.headLine,
              }))
            : [];
          result.data.push({
            _id: element._id || '',
            productName: element.productName,
            price: element.price,
            category: element.category,
            brand: element.brand,
            stock: element.stock,
            rating: element.rating || 0,
            ratings,
            imageUrl: element.imageUrl || undefined,
            isDeleted: element.isDeleted || undefined,
            deleted_by: element.deleted_by || undefined,
            deleted_date: element.deleted_date || undefined,
          });
        }
      });
    }
    result.pagination = {
      totalDocs: response.pagination?.totalDocs || 0,
      limit: response.pagination?.limit || 0,
      hasPrevPage: response.pagination?.hasPrevPage || false,
      hasNextPage: response.pagination?.hasNextPage || false,
      page: response.pagination?.page || 0,
      totalPages: response.pagination?.totalPages || 0,
      offset: response.pagination?.offset || 0,
      prevPage: response.pagination?.prevPage || 0,
      nextPage: response.pagination?.nextPage || 0,
      pagingCounter: response.pagination?.pagingCounter || 0,
    };
    return result;
  } else {
    return result;
  }
}
