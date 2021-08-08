import { mongoosePagination, Pagination, PaginationModel } from 'mongoose-paginate-ts';
import { Schema, Document } from 'mongoose';

export interface IPagination<T extends Document> extends Pagination<T> {
  paginateAll(
    query?: any | undefined,
    callback?: ((err: any, docs: T[]) => void) | undefined,
  ): Promise<PaginationModel<T> | undefined>;
}

export function mongoosePaginationExtended<T extends Document>(schema: Schema<T>) {
  schema.plugin(mongoosePagination);
  schema.statics.paginateAll = async function paginateAll(
    query: any,
  ): Promise<PaginationModel<T> | undefined> {
    const {
      limit = 10,
      page = 1,
      include = '',
      sort = '',
      select = '',
      aggregate,
      ...filter
    } = query;
    const model = this as Pagination<T>;
    return model.paginate({
      query: filter,
      aggregate,
      populate: { path: include },
      sort: sort,
      select: select,
      page,
      limit,
    });
  };
}
