import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imgUrl, setImgUrl] = useState('');

  function viewImage(url: string): void {
    setImgUrl(url);
    onOpen();
  }
  // console.log(cards);
  return (
    <>
      <SimpleGrid spacing="40px" columns={3}>
        {cards &&
          cards.map(card => {
            return (
              <Card
                key={card.id}
                viewImage={() => viewImage(card.url)}
                data={card}
              />
            );
          })}
      </SimpleGrid>

      {isOpen && (
        <ModalViewImage imgUrl={imgUrl} isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
}
