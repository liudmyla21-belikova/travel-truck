import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '../../api';

interface RequestServerProps {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RequestServerProps) {
  try {
    const { id } = await params;
    const response = await api.get(`/campers/${id}`);
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