import { VStack, SkeletonCircle, SkeletonText } from "@hope-ui/solid";

const SkeletonPlaceholder = () => (
  <VStack
    alignItems="stretch"
    spacing="$2"
    class="p-8 rounded-lg border border-slate-800 md:w-[700px] w-[90%]"
    mx="auto"
  >
    <SkeletonCircle size="$10" />
    <SkeletonText mt="$4" noOfLines={4} spacing="$4" />
    <SkeletonText mt="$4" noOfLines={4} spacing="$4" />
    <SkeletonText mt="$4" noOfLines={4} spacing="$4" />
  </VStack>
);

export default SkeletonPlaceholder;
