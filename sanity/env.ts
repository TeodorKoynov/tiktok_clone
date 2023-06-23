export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-23'

export const dataset = assertValue(
    "production",
    'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
    // process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    "b58c7jb2",
    'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = false

export const token = assertValue(
    'skodEzNuLtkwEgwoLd5Ydhd8JoV3FPYPCjNfhpQy9DsKhnABuDss4dzY40chdUPZn2ej5kRfS9efn4Q4WViZnGmBB6Uj6Joi0H7qDbcOj3SVKGWddCIkYDVxiCOD51C37TzE5m6g0QE1BwLxpFSJWYMzCbu9exVsLdClKOc0JtLNknWwfmAA',
    // process.env.NEXT_PUBLIC_SANITY_TOKEN,
    'Missing environment variable: NEXT_PUBLIC_SANITY_TOKEN)'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage)
    }

    return v
}
