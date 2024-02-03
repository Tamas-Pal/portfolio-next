import { Landing } from '@/types/landing';
import { IndustryBlock } from './IndustryBlock';
import { ProfileBlock } from './ProfileBlock';
import { Block } from './Block';


export default function Blocks({ landing }: { landing: Landing }) {
  
  
  return landing.attributes.Blocks.map((block: any, i: number) => {
    // pass in blocks as children to optimize for server rendering
    const blockComponent =
      block.__component === 'landing.block' ? (
        <IndustryBlock industryBlock={block} index={i} />
      ) : (
        <ProfileBlock profileBlock={block} />
      );

    return (
      <Block key={i} landing={landing} index={i}>
        {blockComponent}
      </Block>
    );
  });
}
