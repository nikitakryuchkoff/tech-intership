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
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const totalCount = useRef<number>();

  useEffect(() => {
    AdvertismentsService.getAllAdvertisements(page, limit).then(
      ({ data, items }) => {
        setAdvertisements(data);
        totalCount.current = items;
      },
    );
  }, [limit, page]);

  const totalPages =
    totalCount.current && Math.ceil(totalCount.current / limit);

  return (
    <>
      <Row className="mt-4">
        <Col md={10}>
          <SearchInput />
        </Col>
        <Col md={2}>
          <SelectCardCount setLimit={setLimit} />
        </Col>
      </Row>
      <Row className="mt-4">
        {advertisements.map((item) => (
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
