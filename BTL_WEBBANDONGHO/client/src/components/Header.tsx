'use client';
import Link from 'next/link';

import { FaHeart, FaShoppingCart} from 'react-icons/fa';

import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from 'primereact/button';
import { MegaMenu } from 'primereact/megamenu';
export default function Header() {
    const router = useRouter();

    const items = [
      {
          label: 'Sản phẩm',
          icon: 'pi pi-box',
          items: [
              [
                  {
                      label: 'Đồng hồ nam',
                      items: [
                          { label: 'Cơ tự động',command: () => router.push('/user/shopproducts'), },
                          { label: 'Quartz (pin)' },
                          { label: 'Thông minh' },
                      ]
                  }
              ],
              [
                  {
                      label: 'Đồng hồ nữ',
                      items: [
                          { label: 'Thời trang' },
                          { label: 'Dây da' },
                          { label: 'Dây kim loại' },
                      ]
                  }
              ],
              [
                  {
                      label: 'Thương hiệu nổi bật',
                      items: [
                          { label: 'Rolex' },
                          { label: 'Omega' },
                          { label: 'Casio' },
                          { label: 'Seiko' },
                      ]
                  }
              ],
              [
                  {
                      label: 'Loại đồng hồ',
                      items: [
                          { label: 'Cổ điển' },
                          { label: 'Thể thao' },
                          { label: 'Lặn nước' },
                      ]
                  }
              ]
          ]
      },
      { label: 'Thương hiệu', command: () => router.push('/brands') },
      { label: 'Blog', command: () => router.push('/best-sellers') },
      { label: 'Một số Câu Hỏi', command: () => router.push('/digital-products') },
  ];


    const start = (
        <div className="flex  ">
            <Image src="/images/lo.png" alt="Logo" width={80} height={20} />
           
        </div>
    );

    const end = (
        <div className="flex items-center gap-4">
             <div className=" p-3 p-inputgroup flex-6/12">
                            <InputText placeholder="Tìm kiếm sản phẩm... " />
                            <Button icon="pi pi-search" className="p-button-warning" />
              </div>
                      
       
          <Link href="#" className="relative">
            <FaHeart size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">0</span>
          </Link>
          <Link href="#" className="relative">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">2</span>
          </Link>
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
                <Avatar icon="pi pi-user" className="p-mr-2" shape="circle" />
                <span>
                Xin Chào,<br />
                <strong>Tài Khoản của tôi</strong>
                </span>
            </div>

            {/* Dropdown khi hover */}
            <div className="absolute  right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link href="/user/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Đăng nhập
                </Link>
                <Link href="/user/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Đăng ký
                </Link>
            </div>
        </div>

        </div>
    );

    return (
        <div className='card'>

            <MegaMenu model={items} start={start} end={end} className="p-3" />
        </div>
    );
}
