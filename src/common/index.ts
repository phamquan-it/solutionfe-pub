import { useQueryParams } from "@/pages/dashboard/cashflow";
import { NextRouter } from "next/router";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase_config";
import { MessageInstance } from "antd/es/message/interface";
import { RcFile } from "antd/es/upload";

const containsAll = (array1: (string | number)[], array2: (string | number)[]): boolean => {
    const set1 = new Set(array1.map(String)); // Convert all to string for consistency
    return array2.every(item => set1.has(String(item))); // Check if all items in array2 exist in set1
};

const isLogin = (token: string | undefined) => {
    return true
}
const removeEmptyProperties = (obj: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
    );
};

const syncObjectToUrl = (router: NextRouter, obj: Object) => {
    router.push({
        query: removeEmptyProperties({ ...router.query, ...obj })
    },
        undefined,
        { shallow: true })
}

const usePagination = (
    router: NextRouter,
    pageIndex: number = 1,
    pageSize: number = 10
): { page: number; per_page: number } => {

    return {
        page: Number(router.query.page) || pageIndex,
        per_page: Number(router.query.per_page) || pageSize, // Default values
    };
};
//merge data when click checkbox on template
const mergeUniqueNumericStrings = (router: NextRouter, arr2: (string | number)[]): string[] => {
    const templates = Array.isArray(router.query.template)
        ? router.query?.template
        : router.query?.template
            ? [router?.query?.template]
            : [];
    return Array.from(new Set([...templates, ...arr2].map(num => String(num))));
};
//remove template when uncheck
const filterRouterTemplates = (router: NextRouter, arr2: (string | number)[]): string[] => {
    const templates = Array.isArray(router.query.template)
        ? router.query.template
        : router.query.template
            ? [router.query.template]
            : [];
    const arr2Set = new Set(arr2.map(num => String(num)));
    return templates.filter(template => !arr2Set.has(String(template)));
};

const mergeUniqueTechnologies = (router: NextRouter, arr2: (string | number)[]): string[] => {
    const technologies = router.query?.technology;
    // Ensure technologies is always an array
    const techArray = Array.isArray(technologies) ? technologies : technologies ? [technologies] : [];
    // Merge and return unique values as strings
    return Array.from(new Set([...techArray, ...arr2].map(String)));
};
const filterRouterTechnologies = (router: NextRouter, arr2: (string | number)[]): string[] => {
    const technologies = Array.isArray(router.query.technology)
        ? router.query.technology
        : router.query.technology
            ? [router.query.technology]
            : [];
    const arr2Set = new Set(arr2.map(String));
    return technologies.filter(tech => !arr2Set.has(String(tech)));
};


const getEntryNo = (index: number, router: NextRouter) => {
    const { page, per_page } = usePagination(router)
    return page * per_page + (index + 1) - per_page;
}

const handleUpload = async (file: File, messageApi: MessageInstance): Promise<string> => {
    if (!file) {
        return Promise.reject("No file selected.");
    }

    const storagePath = `uploads/${file.name}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload progress: ${progress}%`);
            },
            (error) => {
                console.error("Upload error:", error);
                messageApi.error("Upload failed");
                reject(error);
            },
            async () => {
                try {
                    await getDownloadURL(uploadTask.snapshot.ref);
                    messageApi.success("Upload successful!");
                    resolve(storagePath);
                } catch (error) {
                    console.error("Error getting download URL:", error);
                    reject(error);
                }
            }
        );
    });
};

const uploadAndConvertImage = async (file: RcFile): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = async () => {
            try {
                const base64String = fileReader.result?.toString().split(",")[1];
                if (!base64String) {
                    reject("Failed to read file");
                    return;
                }

                const response = await fetch("/api/convert", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ imageBase64: base64String }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    reject(errorData.error);
                    return;
                }

                const result = await response.json();
                resolve(result.svg || null);
            } catch (error) {
                console.error("Error processing image:", error);
                reject(error);
            }
        };

        fileReader.readAsDataURL(file);
    });
};


export {
    containsAll,
    filterRouterTechnologies,
    mergeUniqueTechnologies,
    filterRouterTemplates,
    mergeUniqueNumericStrings,
    uploadAndConvertImage,
    handleUpload,
    isLogin,
    syncObjectToUrl,
    removeEmptyProperties,
    usePagination,
    getEntryNo
}
