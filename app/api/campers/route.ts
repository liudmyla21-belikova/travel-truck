import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '../api';

export async function GET(request: NextRequest) {
  try {
    const limit = Number(request.nextUrl.searchParams.get('limit') ?? 4);
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const AC = request.nextUrl.searchParams.get('AC') ?? undefined;
    const TV = request.nextUrl.searchParams.get('TV') ?? undefined;
    const kitchen = request.nextUrl.searchParams.get('kitchen') ?? undefined;
    const bathroom = request.nextUrl.searchParams.get('bathroom') ?? undefined;
    const radio = request.nextUrl.searchParams.get('radio') ?? undefined;
    const refrigerator = request.nextUrl.searchParams.get('refrigerator') ?? undefined;
    const microwave = request.nextUrl.searchParams.get('microwave') ?? undefined;
    const gas = request.nextUrl.searchParams.get('gas') ?? undefined;
    const water = request.nextUrl.searchParams.get('water') ?? undefined;
    const form = request.nextUrl.searchParams.get('form') ?? undefined;
    const location = request.nextUrl.searchParams.get('location') ?? undefined;
    const response = await api.get('/campers', {
      params: {
        location,
        AC,
        TV,
        kitchen,
        bathroom,
        form,
        radio,
        refrigerator,
        microwave,
        gas,
        water,
        limit,
        page,
      },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}