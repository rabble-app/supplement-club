/** @format */

"use client";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import Spinner from "@/components/shared/Spinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { productService } from "@/services/productService";
import type IProductCardModel from "@/utils/models/IProductCardModel";

const ExpansionSelector = dynamic(
  () => import("@/components/main/products/ExpansionSelector")
);
const SortBy = dynamic(() => import("@/components/main/products/SortBy"));
const ProductCard = dynamic(() => import("@/components/shared/ProductCard"));

export default function Products() {
  const searchParams = useSearchParams();
  const [showAll, setShowAll] = useState(true);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [defaultCategorySelection, setDefaultCategorySelection] =
    useState<string>();
  const [defaultGoalSelection, setDefaultGoalSelection] = useState<string>();
  const [goals, setGoals] = useState<string[]>([]);
  const [sortItems, setSortItems] = useState<string[]>([]);
  const [products, setProducts] = useState<IProductCardModel[]>([]);
  const [initProducts, setInitProducts] = useState<IProductCardModel[]>([]);

  // Toggle "show all" products
  const toggleShowAll = () => setShowAll((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, tagsResponse] = await Promise.all([
          productService.products(),
          productService.productTags(),
        ]);

        setProducts(productsResponse);
        setInitProducts(productsResponse);

        setCategories(
          tagsResponse
            .filter((tag) => tag.type === "CATEGORY")
            .map((tag) => tag.name)
        );
        setGoals(
          tagsResponse
            .filter((tag) => tag.type === "GOALS")
            .map((tag) => tag.name)
        );
        setSortItems(
          tagsResponse
            .filter((tag) => tag.type === "SORT")
            .map((tag) => tag.name)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateProducts = (tags: string[]) => {
    setProducts(
      tags.length
        ? initProducts.filter((product) =>
            product.tags?.some((tag) => tags.includes(tag))
          )
        : initProducts
    );
  };

  const sortProducts = (item: string) => {
    setProducts(
      item
        ? initProducts.filter((product) => product.tags?.includes(item))
        : initProducts
    );
  };

  useEffect(() => {
    const category = searchParams.get("category");
    const goal = searchParams.get("goal");
    if (category) {
      const queryTag = categories?.find(
        (tag) => tag.toLowerCase() === category.replaceAll("-", " ")
      );
      setDefaultCategorySelection(queryTag);
      setProducts(
        initProducts.filter((product) =>
          product.tags?.some((tag) => tag === queryTag)
        )
      );
    } else if (goal) {
      const queryTag = goals?.find(
        (tag) => tag.toLowerCase().replaceAll(" ", "-") === goal
      );
      setDefaultGoalSelection(queryTag);
      setProducts(
        initProducts.filter((product) =>
          product.tags?.some((tag) => tag === queryTag)
        )
      );
    } else {
      setProducts(initProducts);
      setDefaultCategorySelection("");
      setDefaultGoalSelection("");
    }
  }, [searchParams, initProducts, categories, goals]);

  useEffect(() => {
    const goal = searchParams.get("goal");
    if (goal) {
      const queryTag = goals?.find(
        (tag) => tag.toLowerCase() === goal.replaceAll("-", " ")
      );
      setDefaultGoalSelection(queryTag);
      setProducts(
        initProducts.filter((product) =>
          product.tags?.some((tag) => tag === queryTag)
        )
      );
    } else {
      setProducts(initProducts);
      setDefaultGoalSelection("");
    }
  }, [searchParams, initProducts, goals]);

  if (loading) return <Spinner />;

  return (
    <div className="pb-[50px] bg-grey11 md:bg-transparent">
      <p className="hidden md:block text-[32px] leading-[37px] font-hagerman text-black bg-yellow py-[16px] text-center">
        Everyone&apos;s Joining Supplement Club
      </p>

      <div className="px-[16px] lg:px-[32px]">
        <div className="max-w-[1500px] mx-auto">
          <div className="min-h-screen bg-grey11 md:bg-transparent">
            {/* Breadcrumb Navigation */}
            <div className="flex justify-between items-center mb-[6px] md:mb-[8px]">
              <Breadcrumb className="pt-[24px] md:pt-[50px]">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Best Teams</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <SortBy updateItems={sortProducts} categories={sortItems} />
            </div>

            {/* Main Content */}
            <div className="grid md:grid-cols-[340px_1fr_] gap-x-[72px]">
              {/* Filters Section */}
              <aside className="mb-[13px] md:mb-[0]">
                <p className="text-[24px] md:text-[40px] leading-[36px] md:leading-[60px] font-hagerman text-black mb-[23px]">
                  Best Teams
                </p>
                <div className="flex flex-col gap-[13px] md:gap-[16px]">
                  <ExpansionSelector
                    defaultSelection={defaultCategorySelection}
                    title="Shop by Category"
                    updateItems={updateProducts}
                    items={categories}
                  />
                  <ExpansionSelector
                    defaultSelection={defaultGoalSelection}
                    title="Shop by Goal"
                    updateItems={updateProducts}
                    items={goals}
                  />
                </div>
              </aside>

              {/* Product Cards */}
              <main>
                <div className="grid md:grid-cols-2 gap-[16px]">
                  {(showAll ? products : products.slice(0, 2)).map(
                    (product) => (
                      <ProductCard key={product.id} {...product} />
                    )
                  )}
                </div>
                {/* View More Button */}
                {!showAll && (
                  <Button
                    onClick={toggleShowAll}
                    className="md:hidden mt-12 text-base font-bold text-blue bg-yellow"
                  >
                    View More Products
                  </Button>
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
