import RestService from "../../domain/services/rest-service";
import { readFileSync } from "fs-extra";
import { OutputResult } from "../../domain/entities";

export default class RestServiceImpl implements RestService {
  getResults({
    page,
    size,
  }: {
    page?: number | string;
    size?: number | string;
  }) {
    try {
      const fileStr = readFileSync(OutputResult.Path, { encoding: "utf8" });

      if (page && !page.toString().match(/[0-9]*/g))
        throw new Error("Ops! Invalid number format...");

      return this.formatResponse(fileStr ? JSON.parse(fileStr) : [], {
        page: page as number,
        size: size as number,
      });
    } catch (error) {
      return [];
    }
  }
  private formatResponse(
    results: Array<any>,
    { page, size }: { page: number | undefined; size: number | undefined }
  ) {
    const currentPage = page ? Number(page) : 1;
    const currentSize = size ? Number(size) : 5;
    const nextPage = currentPage + 1;
    const o: any = {};
    const pages =
      results.length > 0
        ? parseInt(`${results.length / currentSize}`) +
          (results.length % currentSize === 0 ? 0 : 1)
        : 0;

    if (nextPage < results.length % 5) {
      o.nextPage = nextPage;
    }

    if (currentPage > 1) {
      o.previousPage = currentPage - 1;
    }

    return {
      pages,
      items: results.length,
      size: currentSize,
      page: currentPage,
      content: results.slice(currentSize * (currentPage - 1), currentSize * currentPage),
      ...o,
    };
  }
}
