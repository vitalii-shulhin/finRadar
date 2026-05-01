import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <FileQuestion className="w-24 h-24 mx-auto text-gray-400" />
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Новину не знайдено
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          На жаль, ця новина більше не доступна або була видалена
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Повернутися на головну
        </Link>
      </div>
    </div>
  );
}
