import { useEffect, useRef, useState } from 'react';
import { AdvertismentsService } from '../../services';
import { Col, Row } from 'react-bootstrap';
import {
  AdvertisementCard,
  Pagination,
  SearchInput,
  SelectCardCount,
} from '..';
import type { IAdvertisements } from '../../types';

export default function AdvertisementsList(): JSX.Element {
  const [advertisements, setAdvertisements] = useState<IAdvertisements[]>([]);
  const [currentAdvertisements, setCurrentAdvertisements] =
    useState<IAdvertisements[]>(advertisements);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const totalCount = useRef<number>();

  const fetchAdvertisements = () => {
    AdvertismentsService.getAllAdvertisements(page, limit).then(
      ({ data, itemsCount }) => {
        setAdvertisements(data);
        totalCount.current = itemsCount;
      },
    );
  };

  const searchAdvertisements = () => {
    AdvertismentsService.searchByTitle(searchQuery, page, limit).then(
      ({ data, itemsCount }) => {
        setCurrentAdvertisements(data);
        totalCount.current = itemsCount;
      },
    );
  };

  useEffect(() => {
    if (searchQuery) {
      searchAdvertisements();
    } else {
      fetchAdvertisements();
    }
  }, [limit, page, searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setCurrentAdvertisements(advertisements);
    }
  }, [advertisements, searchQuery]);

  const totalPages =
    totalCount.current && Math.ceil(totalCount.current / limit);

  return (
    <>
      <Row className="mt-4">
        <Col md={10}>
          <SearchInput setSearchQuery={setSearchQuery} />{' '}
        </Col>
        <Col md={2}>
          <SelectCardCount setLimit={setLimit} />
        </Col>
      </Row>
      <Row className="mt-4">
        {currentAdvertisements.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={4}>
            <AdvertisementCard
              title={item.title}
              price={item.price}
              views={item.views}
              image={item.image}
              likes={item.likes}
            />
          </Col>
        ))}
        {totalPages !== undefined && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </Row>
    </>
  );
}
