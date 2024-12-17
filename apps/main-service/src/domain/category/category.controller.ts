import { Controller, Get, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller('/categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    find(@Query('skip') skip: number, @Query('take') take: number) {
        return this.categoryService.findMany({ skip, take });
    }
}