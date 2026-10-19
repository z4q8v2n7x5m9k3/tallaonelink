import { NextRequest, NextResponse } from 'next/server'
import { shopConfig } from '../../shops/dogra-associates/config'

export const dynamic = 'force-dynamic'

function unavailable() {
  return NextResponse.json({ rating: null, totalReviews: 0, reviews: [], unavailable: true, googleUrl: shopConfig.google.mapsUrl })
}

export async function GET(request: NextRequest) {
  const requestedId = request.nextUrl.searchParams.get('placeId')
  const placeId = process.env.GOOGLE_PLACE_ID || process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || requestedId
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey || !placeId || placeId === 'talla-jewellers-jammu') return unavailable()
  try {
    const params = new URLSearchParams({ place_id: placeId, fields: 'name,rating,user_ratings_total,reviews,url', key: apiKey })
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(10000) })
    if (!response.ok) return unavailable()
    const data = await response.json()
    if (data.status !== 'OK' || !data.result) return unavailable()
    const result = data.result
    return NextResponse.json({ rating: result.rating ?? null, totalReviews: result.user_ratings_total ?? 0, reviews: result.reviews || [], googleUrl: result.url, unavailable: false })
  } catch { return unavailable() }
}
