import { useLocalSearchParams } from 'expo-router';
import PurchaseScreen from '../../(screens)/PurchaseScreen';

export default function PurchaseRoute() {
  const params = useLocalSearchParams();
  return <PurchaseScreen routeParams={params} />;
}
