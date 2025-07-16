import { useLocalSearchParams } from 'expo-router';
import PrizeDetailScreen from '../../(screens)/PrizeDetail';

export default function PrizeDetailRoute() {
  const params = useLocalSearchParams();

  return <PrizeDetailScreen routeParams={params} />;
}
