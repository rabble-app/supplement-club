"use client";

/** @format */

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { productService } from "@/services/productService";
import type IProductCardModel from "@/utils/models/IProductCardModel";
import type { IProductCertificationModel } from "@/utils/models/IProductCardModel";
import { toWordCase } from "@/utils/utils";
import { Input } from "@/components/ui/input";

export default function Certifications() {
  const [products, setProducts] = useState<IProductCardModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [activeCertificationBatchNo, setActiveCertificationBatchNo] = useState<
    string | null
  >(null);
  const [activeCertificationUrl, setActiveCertificationUrl] = useState<
    string | null
  >(null);
  const [isCertificationLoading, setIsCertificationLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productsData = await productService.productsLimit(5);
        setProducts(productsData);
        if (productsData.length > 0) {
          const [firstProduct] = productsData;

          setActiveProductId(firstProduct.id);
          const [firstCertification] = firstProduct.certifications ?? [];

          if (firstCertification?.docUrl) {
            setActiveCertificationBatchNo(firstCertification.batchNo);
            setIsCertificationLoading(true);
            setActiveCertificationUrl(firstCertification.docUrl);
          } else {
            setActiveCertificationBatchNo(null);
            setActiveCertificationUrl(null);
            setIsCertificationLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateViewport = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!isMobileView) {
      setIsMobileModalOpen(false);
    }
  }, [isMobileView]);

  useEffect(() => {
    setSearchTerm("");
  }, [activeProductId]);

  const updateActiveCertification = useCallback(
    (certification?: IProductCertificationModel | null) => {
      if (certification?.docUrl) {
        if (certification.docUrl !== activeCertificationUrl) {
          setIsCertificationLoading(true);
          setActiveCertificationUrl(certification.docUrl);
        } else {
          setIsCertificationLoading(false);
        }

        setActiveCertificationBatchNo(certification.batchNo);
      } else {
        setActiveCertificationBatchNo(certification?.batchNo ?? null);
        setActiveCertificationUrl(null);
        setIsCertificationLoading(false);
      }
    },
    [activeCertificationUrl]
  );

  const activeProduct = activeProductId
    ? products.find((product) => product.id === activeProductId)
    : undefined;
  const filteredCertifications = useMemo(() => {
    const certifications = activeProduct?.certifications ?? [];

    if (!searchTerm.trim()) {
      return certifications;
    }

    const term = searchTerm.trim().toLowerCase();

    return certifications.filter((certification) =>
      certification.batchNo.toLowerCase().includes(term)
    );
  }, [activeProduct?.certifications, searchTerm]);

  useEffect(() => {
    if (!activeProductId) {
      return;
    }

    if (!filteredCertifications.length) {
      if (activeCertificationBatchNo !== null || activeCertificationUrl !== null) {
        setActiveCertificationBatchNo(null);
        setActiveCertificationUrl(null);
        setIsCertificationLoading(false);
      }
      setIsMobileModalOpen(false);

      return;
    }

    const activeInFiltered = filteredCertifications.some(
      (certification) => certification.batchNo === activeCertificationBatchNo
    );

    if (!activeInFiltered) {
      updateActiveCertification(filteredCertifications[0]);
    }
  }, [
    activeProductId,
    filteredCertifications,
    activeCertificationBatchNo,
    activeCertificationUrl,
    updateActiveCertification,
  ]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E3E3E3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full mx-auto bg-[#D8FF75] text-center py-[15px] md:py-[22px]">
        <p className="text-[20px] md:text-[32px] leading-[100%] font-hagerman font-normal text-black">
          Certificate of analysis
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row">
        <div
          className="hidden md:block md:w-[20%] md:h-[100vh] md:border-r md:border-r-[#E3E3E3]"
          id="nav-web"
        >
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => {
                setActiveProductId(product.id);
                setIsMobileModalOpen(false);
                const [firstCertification] = product.certifications ?? [];

                updateActiveCertification(firstCertification ?? null);
              }}
              className={`w-full p-[20px] border-b-[1.5px]  text-center text-[20px] leading-[100%] font-[700] font-inconsolata transition-colors cursor-pointer ${
                product.id === activeProductId
                  ? "text-[#00038F] border-[#00038F]"
                  : "border-[#E3E3E3] text-[#999999] hover:bg-[#E3E3E3]"
              }`}
            >
              {toWordCase(product.name || "")}
            </button>
          ))}
        </div>
        <div className="w-full md:w-[80%] flex flex-col">
          <div className="w-full bg-white rounded-[8px] p-[16px]">
            <div className="mb-[30px] md:hidden">
              <div className="relative">
                <select
                  id="product-select"
                  value={activeProductId ?? ""}
                  className="w-full appearance-none border border-[black] px-4 py-3 text-[16px] font-roboto text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#00038F]"
                  onChange={(event) => {
                    const { value } = event.target;

                    if (!value) {
                      return;
                    }

                    const selectedProduct = products.find(
                      (product) => product.id === value
                    );

                    if (!selectedProduct) {
                      return;
                    }

                    setActiveProductId(selectedProduct.id);
                  setIsMobileModalOpen(false);
                    const [firstCertification] =
                      selectedProduct.certifications ?? [];
                    updateActiveCertification(firstCertification ?? null);
                  }}
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {toWordCase(product.name || "")}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#4F4F4F]">
                  ▾
                </span>
              </div>
            </div>
            <div className="relative w-full md:w-[25%]">
              <Image
                src="/images/search.svg"
                alt="Search"
                width={24}
                height={24}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <Input
                type="text"
                placeholder="Search"
                className="w-full border-t-0 border-l-0 border-r-0 border-b-[1.5px] border-b-[#E3E3E3] pl-[48px] font-roboto text-[16px] font-[400]"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>
          <div className="w-full px-[16px] pb-[20px] flex flex-col md:flex-row">
            <div className="w-full md:w-[25%]">
              <p className="text-[24px] font-[600] font-inconsolata leading-[150%] text-[#000000] mb-[5px]">
                BATCH
              </p>
            {filteredCertifications.length ? (
              filteredCertifications.map((certification) => {
                const isActive =
                  certification.batchNo === activeCertificationBatchNo;

                return (
                  <button
                    key={certification.batchNo}
                    type="button"
                    onClick={() => {
                      updateActiveCertification(certification);
                      if (isMobileView) {
                        setIsMobileModalOpen(Boolean(certification.docUrl));
                      }
                    }}
                    className={`w-full text-left border-[1.5px] p-[10px] mb-[10px] text-[20px] font-[400] font-hagerman leading-[150%] underline transition-colors ${
                      isActive
                        ? "border-[#00038F] bg-[#F4F5FF] text-[#00038F]"
                        : "border-[#E3E3E3] text-[#00038F] hover:bg-[#E3E3E3]"
                    }`}
                  >
                    {certification.batchNo}
                  </button>
                );
              })
            ) : (
              <p className="text-[16px] font-roboto text-[#999999]">
                No certifications available for this product.
              </p>
            )}
            </div>
            <div className="hidden md:block md:w-[75%] p-[16px] pt-0">
              <div
                className="relative text-[16px] font-[400] font-roboto border-[1.5px] border-[#E3E3E3] h-[90vh] rounded-[8px] overflow-hidden"
                id="certification-content"
              >
                {isCertificationLoading && activeCertificationUrl ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 z-10">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00038F]" />
                    <p className="mt-4 text-[#4F4F4F]">Loading certificate...</p>
                  </div>
                ) : null}
                {activeCertificationUrl ? (
                  <iframe
                    key={activeCertificationUrl}
                    src={activeCertificationUrl}
                    title="Certificate of analysis"
                    className="w-full h-full"
                    onLoad={() => setIsCertificationLoading(false)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#999999] px-[16px] text-center">
                    Select a batch to view its certificate.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobileView && isMobileModalOpen && activeCertificationUrl ? (
        <div className="fixed inset-0 z-50 flex bg-black/70">
          <div className="flex h-full w-full flex-col bg-white">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E3E3E3] bg-[#F4F5FF]">
              <p className="text-[16px] font-roboto font-[600] text-[#00038F]">
                {activeCertificationBatchNo ?? ""}
              </p>
              <button
                type="button"
                onClick={() => setIsMobileModalOpen(false)}
                className="p-2"
                aria-label="Close certificate"
              >
                <Image
                  src="/images/arrownDown.svg"
                  alt="Close"
                  width={20}
                  height={20}
                />
              </button>
            </div>
            <div className="relative flex-1 bg-white">
              {isCertificationLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00038F]" />
                  <p className="mt-4 text-[#4F4F4F] text-[14px]">
                    Loading certificate...
                  </p>
                </div>
              ) : null}
              <iframe
                key={activeCertificationUrl}
                src={activeCertificationUrl}
                title="Certificate of analysis"
                className="h-full w-full"
                onLoad={() => setIsCertificationLoading(false)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
