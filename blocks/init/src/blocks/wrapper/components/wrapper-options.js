import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, TextControl, Dashicon, TabPanel, Icon } from '@wordpress/components';
import { ColorPaletteCustom } from 'EightshiftComponentColorPalette';
import { WrapperResponsiveTabContent } from './wrapper-responsive-tab-content';
import globalSettings from '../../manifest.json';

export const WrapperOptions = (props) => {
  const {
    attributes: {
      id,
      anchor,
      styleBackgroundColor,

      styleContentWidthLarge,
      styleContentOffsetLarge,
      styleContainerWidthLarge,
      styleContainerSpacingLarge,
      styleSpacingTopLarge,
      styleSpacingBottomLarge,
      styleHideBlockLarge,

      styleContentWidthDesktop,
      styleContentOffsetDesktop,
      styleContainerWidthDesktop,
      styleContainerSpacingDesktop,
      styleSpacingTopDesktop,
      styleSpacingBottomDesktop,
      styleHideBlockDesktop,

      styleContentWidthTablet,
      styleContentOffsetTablet,
      styleContainerWidthTablet,
      styleContainerSpacingTablet,
      styleSpacingTopTablet,
      styleSpacingBottomTablet,
      styleHideBlockTablet,

      styleContentWidthMobile,
      styleContentOffsetMobile,
      styleContainerWidthMobile,
      styleContainerSpacingMobile,
      styleSpacingTopMobile,
      styleSpacingBottomMobile,
      styleHideBlockMobile,
    },
    actions: {
      onChangeStyleContentWidthLarge,
      onChangeStyleContentOffsetLarge,
      onChangeStyleContainerWidthLarge,
      onChangeStyleContainerSpacingLarge,
      onChangeStyleSpacingTopLarge,
      onChangeStyleSpacingBottomLarge,
      onChangeStyleHideBlockLarge,

      onChangeStyleContentWidthDesktop,
      onChangeStyleContentOffsetDesktop,
      onChangeStyleContainerWidthDesktop,
      onChangeStyleContainerSpacingDesktop,
      onChangeStyleSpacingTopDesktop,
      onChangeStyleSpacingBottomDesktop,
      onChangeStyleHideBlockDesktop,

      onChangeStyleContentWidthTablet,
      onChangeStyleContentOffsetTablet,
      onChangeStyleContainerWidthTablet,
      onChangeStyleContainerSpacingTablet,
      onChangeStyleSpacingTopTablet,
      onChangeStyleSpacingBottomTablet,
      onChangeStyleHideBlockTablet,

      onChangeStyleContentWidthMobile,
      onChangeStyleContentOffsetMobile,
      onChangeStyleContainerWidthMobile,
      onChangeStyleContainerSpacingMobile,
      onChangeStyleSpacingTopMobile,
      onChangeStyleSpacingBottomMobile,
      onChangeStyleHideBlockMobile,

      onChangeStyleBackgroundColor,
      onChangeId,
      onChangeAnchor,
    },
  } = props;

  return (
    <Fragment>
      <PanelBody title={__('Block Responsive Layout', 'eightshift-boilerplate')} initialOpen={false}>
        <TabPanel
          className="custom-button-tabs"
          activeClass="components-button is-button is-primary"
          tabs={[
            {
              name: 'large',
              title: <Dashicon icon="desktop" />,
              className: 'tab-large components-button is-button is-default custom-button-with-icon',
            },
            {
              name: 'desktop',
              title: <Dashicon icon="laptop" />,
              className: 'tab-desktop components-button is-button is-default custom-button-with-icon',
            },
            {
              name: 'tablet',
              title: <Dashicon icon="tablet" />,
              className: 'tab-tablet components-button is-button is-default custom-button-with-icon',
            },
            {
              name: 'mobile',
              title: <Dashicon icon="smartphone" />,
              className: 'tab-mobile components-button is-button is-default custom-button-with-icon',
            },
          ]
          }
        >
          {(tab) => (
            <Fragment>
              {tab.name === 'large' && (
                <Fragment>
                  <br />
                  <strong className="notice-title">{__('Large Layout Options', 'eightshift-boilerplate')}</strong>
                  <p>{__('This options will only control large screens options.', 'eightshift-boilerplate')}</p>
                  <br />
                  <WrapperResponsiveTabContent
                    contentWidth={styleContentWidthLarge}
                    contentOffset={styleContentOffsetLarge}
                    containerWidth={styleContainerWidthLarge}
                    containerSpacing={styleContainerSpacingLarge}
                    spacingTop={styleSpacingTopLarge}
                    spacingBottom={styleSpacingBottomLarge}
                    hideBlock={styleHideBlockLarge}
                    onChangeContentWidth={onChangeStyleContentWidthLarge}
                    onChangeContentOffset={onChangeStyleContentOffsetLarge}
                    onChangeContainerWidth={onChangeStyleContainerWidthLarge}
                    onChangeContainerSpacing={onChangeStyleContainerSpacingLarge}
                    onChangeSpacingTop={onChangeStyleSpacingTopLarge}
                    onChangeSpacingBottom={onChangeStyleSpacingBottomLarge}
                    onChangeHideBlock={onChangeStyleHideBlockLarge}
                  />
                </Fragment>
              )}
              {tab.name === 'desktop' && (
                <Fragment>
                  <br />
                  <strong className="notice-title">{__('Desktop Layout Options', 'eightshift-boilerplate')}</strong>
                  <p>{__('This options will only control desktop screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
                  <br />
                  <WrapperResponsiveTabContent
                    contentWidth={styleContentWidthDesktop}
                    contentOffset={styleContentOffsetDesktop}
                    containerWidth={styleContainerWidthDesktop}
                    containerSpacing={styleContainerSpacingDesktop}
                    spacingTop={styleSpacingTopDesktop}
                    spacingBottom={styleSpacingBottomDesktop}
                    hideBlock={styleHideBlockDesktop}
                    onChangeContentWidth={onChangeStyleContentWidthDesktop}
                    onChangeContentOffset={onChangeStyleContentOffsetDesktop}
                    onChangeContainerWidth={onChangeStyleContainerWidthDesktop}
                    onChangeContainerSpacing={onChangeStyleContainerSpacingDesktop}
                    onChangeSpacingTop={onChangeStyleSpacingTopDesktop}
                    onChangeSpacingBottom={onChangeStyleSpacingBottomDesktop}
                    onChangeHideBlock={onChangeStyleHideBlockDesktop}
                  />
                </Fragment>
              )}
              {tab.name === 'tablet' && (
                <Fragment>
                  <br />
                  <strong className="notice-title">{__('Tablet Layout Options', 'eightshift-boilerplate')}</strong>
                  <p>{__('This options will only control tablet screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
                  <br />
                  <WrapperResponsiveTabContent
                    contentWidth={styleContentWidthTablet}
                    contentOffset={styleContentOffsetTablet}
                    containerWidth={styleContainerWidthTablet}
                    containerSpacing={styleContainerSpacingTablet}
                    spacingTop={styleSpacingTopTablet}
                    spacingBottom={styleSpacingBottomTablet}
                    hideBlock={styleHideBlockTablet}
                    onChangeContentWidth={onChangeStyleContentWidthTablet}
                    onChangeContentOffset={onChangeStyleContentOffsetTablet}
                    onChangeContainerWidth={onChangeStyleContainerWidthTablet}
                    onChangeContainerSpacing={onChangeStyleContainerSpacingTablet}
                    onChangeSpacingTop={onChangeStyleSpacingTopTablet}
                    onChangeSpacingBottom={onChangeStyleSpacingBottomTablet}
                    onChangeHideBlock={onChangeStyleHideBlockTablet}
                  />
                </Fragment>
              )}
              {tab.name === 'mobile' && (
                <Fragment>
                  <br />
                  <strong className="notice-title ">{__('Mobile Layout Options', 'eightshift-boilerplate')}</strong>
                  <p>{__('This options will only control mobile screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
                  <br />
                  <WrapperResponsiveTabContent
                    contentWidth={styleContentWidthMobile}
                    contentOffset={styleContentOffsetMobile}
                    containerWidth={styleContainerWidthMobile}
                    containerSpacing={styleContainerSpacingMobile}
                    spacingTop={styleSpacingTopMobile}
                    spacingBottom={styleSpacingBottomMobile}
                    hideBlock={styleHideBlockMobile}
                    onChangeContentWidth={onChangeStyleContentWidthMobile}
                    onChangeContentOffset={onChangeStyleContentOffsetMobile}
                    onChangeContainerWidth={onChangeStyleContainerWidthMobile}
                    onChangeContainerSpacing={onChangeStyleContainerSpacingMobile}
                    onChangeSpacingTop={onChangeStyleSpacingTopMobile}
                    onChangeSpacingBottom={onChangeStyleSpacingBottomMobile}
                    onChangeHideBlock={onChangeStyleHideBlockMobile}
                  />
                </Fragment>
              )}
            </Fragment>
          )}
        </TabPanel>

        <hr />
        <strong className="notice-title">{__('Block Colors', 'eightshift-boilerplate')}</strong>
        <br /><br />
        {onChangeStyleBackgroundColor &&
          <ColorPaletteCustom
            label={
              <Fragment>
                <Icon icon={() => <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m18.8341675.92971801c.3770446 0 .6835937.3065491.6835937.68359375v11.47888184c0 .1617432-.131073.2929687-.2929687.2929687-.1617432 0-.2929688-.1312255-.2929688-.2929687v-11.47888184c0-.05386352-.0437927-.09765625-.0976562-.09765625h-2.2802734c-.1618958 0-.2929688-.13122559-.2929688-.29296875 0-.16189574.131073-.29296875.2929688-.29296875zm.390625 13.14529419c.1618957 0 .2931213.131073.2931213.2929687v3.9518738c0 .9265137-.7536316 1.6801453-1.6801452 1.6801453-.9263611 0-1.6799927-.7536316-1.6799927-1.6801453v-6.516571c0-.6033325-.4908753-1.0940552-1.0940552-1.0940552-.6033325 0-1.0942078.4908753-1.0942078 1.0940552v1.9816589c0 .9263611-.7536316 1.6799927-1.6799926 1.6799927-.9263611 0-1.6801453-.7536316-1.6801453-1.6799927v-1.1689758c-.0125122.0006103-.0250244.0018311-.0376892.0018311-.211792 0-.4107666-.0823975-.5604553-.2322388l-2.06146245-2.0614624c-.88409422.9051513-1.68792723 1.9673156-2.39044188 3.1605529-.10421754.1773072-.22644043.3549195-.36315918.5279542-.05783082.0732421-.14358519.1113891-.23010254.1113891-.06362914 0-.12771605-.0205993-.18142699-.0630188-.12695312-.1002502-.14862062-.2845764-.04837035-.4115295.12023922-.1521301.22720336-.3076172.31814574-.4620362.72769164-1.2359619 1.56188965-2.3374939 2.48092653-3.27758785l-.72525028-.72509766c-.9399414.91888431-2.0414734 1.75323491-3.27743527 2.48092651-.30426028.1789856-.59570313.4071045-.86624149.6776428-.48278808.4827881-.83206175 1.0348511-.98342894 1.5545655-.13168336.4522705-.09155274.8271789.11016848 1.0290527.3701782.3700256 1.24649046.1849365 2.08404539-.4400635.12954711-.0968933.31311035-.0701904.41000367.0595093.0967407.1295471.07003781.3131104-.0595093.4100036-.65811156.4911805-1.32949828.7450867-1.89102172.7452393-.38360594 0-.7157898-.1184082-.95779418-.3604126-.36285402-.362854-.45455933-.9336853-.2584839-1.6072082.17852785-.612793.58044433-1.2538147 1.13159179-1.8051148.30563356-.3054809.6364441-.5639648.98342895-.76828 1.19308472-.7023621 2.25524906-1.50619506 3.16040039-2.39028932l-2.06146238-2.06161496c-.30899047-.30899051-.30899047-.81176758 0-1.12075809l1.55441285-1.55456543c.14968871-.14968871.3488159-.23208617.56045531-.23208617.06561281 0 .12954711.00885008.19149781.02410891l3.59375004-3.59359742c.3089904-.30899047.8117675-.30899047 1.1209106 0l.6977844.69793699h3.2247925c.1618957 0 .2929688.13107301.2929688.29296875 0 .16174316-.1310731.29296875-.2929688.29296875h-2.638855l3.8491822 3.84902957c.3089904.30899047.3089904.81192015 0 1.12091062l-3.5940552 3.5940552c.0643921.2607727-.0041199.5480957-.2076722.7514954l-1.4912414 1.491394v1.4624023c0 .6033326.4908752 1.0940552 1.0942078 1.0940552.6031799 0 1.0940551-.4907226 1.0940551-1.0940552v-1.9816589c0-.9263611.7536316-1.6799927 1.6799927-1.6799927s1.6801453.7536316 1.6801453 1.6799927v6.516571c0 .6033326.4907226 1.0942078 1.0940552 1.0942078.6033325 0 1.0940552-.4908752 1.0940552-1.0942078v-3.9518738c0-.1618957.1312255-.2929687.2929687-.2929687zm-8.5760498-13.42895509-3.51318364 3.51318359.42099.42099 2.33657836-2.33642578c.11428838-.1144409.29983528-.1144409.41427618 0 .1144409.11444094.1144409.29983524 0 .41442871l-2.33642583 2.33642578.31570434.31570434.59371949-.59356687c.11428832-.11444094.2998352-.11428833.41427613 0 .11444094.11444093.11444094.29998781 0 .41427613l-.59371949.59356687 2.07489016 2.07489016.5937195-.59356691c.1142883-.11428833.2998352-.11428833.4142761 0 .1144409.11444093.1144409.29983523 0 .41442871l-.5935669.59356691 1.3703918 1.37039184 3.5131836-3.5131836c.0805664-.08041383.0805664-.21163941 0-.29205324l-5.132904-5.13305664c-.0805664-.08056641-.2116394-.08056641-.2922058 0zm-.2230835 11.32522589c.0390625.0390625.0907898.0605774.1460266.0605774s.1071167-.0215149.1461792-.0605774l1.5544128-1.5544129c.0805664-.0805664.0805664-.2116394 0-.2922058l-5.67687983-5.67687989c-.0390625-.0390625-.09094242-.06057738-.14617922-.06057738-.05508422 0-.1069641.02151488-.1460266.06057738l-1.55456543 1.55441286c-.08056641.0805664-.08056641.21163941 0 .29220582zm-3.63372803-5.14236456 3.09921262 3.09921265c.11444091.11444091.11444091.29983521 0 .41442871-.05722043.0570679-.13214109.0857544-.20706176.0857544-.07507324 0-.1499939-.0286865-.20721437-.0857544l-3.09936524-3.09936523c-.1144409-.1144409-.1144409-.29983519 0-.41427613.11444094-.1144409.29998781-.1144409.41442875 0zm10.77133173.29129031c.1618958 0 .2929688.13107297.2929688.29296875 0 .16189574-.131073.29296875-.2929688.29296875-.1618957 0-.2944946-.13107301-.2944946-.29296875 0-.16189578.1295471-.29296875.2914429-.29296875zm.2413941.80078125h.0030518.0036621c.1602172 0 .290985.12878418.2929687.28930664.0019836.16174316-.1275635.29449461-.2893066.29663086h-.0038147c-.1600647 0-.2923585-.12878418-.2943421-.28930664-.0019836-.16174316.1258851-.29449465.2877808-.29663086zm-1.8183899.90255734h.0030517c.1618958 0 .2929688.13107301.2929688.29296875 0 .16174321-.131073.29296875-.2929688.29296875-.1618957 0-.2944946-.13122554-.2944946-.29296875 0-.16189574.1295471-.29296875.2914429-.29296875z" /></svg>} />
                {__('Background Color', 'eightshift-boilerplate')}
              </Fragment>
            }
            help={__('Change Block Background color. Block spacing will be included in block background color.', 'eightshift-boilerplate')}
            colors={[
              globalSettings.colors.white,
              globalSettings.colors.primary,
              globalSettings.colors.black,
            ]}
            value={styleBackgroundColor}
            onChange={onChangeStyleBackgroundColor}
          />
        }

        <hr />
        <strong className="notice-title">{__('Block General', 'eightshift-boilerplate')}</strong>
        <br /><br />
        {onChangeId &&
          <TextControl
            label={
              <Fragment>
                <Icon icon={() => <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m6.24854012 18.0785537c.15688156.1157084.1902436.3366319.07458227.4934664-.06917094.0938278-.17603298.1434709-.28430667.1434709-.07279418 0-.14615302-.0223982-.20920679-.0688886-.85823723-.6329376-1.569945-1.4671297-2.05814124-2.4123247-.50471256-.9771453-.77146769-2.0787984-.77146769-3.1858157v-6.09697106c0-.19857235.00851697-.39912101.02522151-.59599938.01651633-.19419623.18751441-.3380906.38152242-.32176249.19419623.01651632.33827882.18732619.3217625.38152242-.01505762.17706818-.02268054.35752433-.02268054.53623945v6.09697106c0 1.9755126.95055925 3.8559268 2.54271423 5.0300917zm1.6467859.8693422c.18403234.0641831.28120103.2653906.21711204.4494229-.05077241.1455884-.18727913.2368281-.33324392.2368281-.0385381 0-.07773496-.0063524-.11617895-.0197631-.24205122-.0843697-.48198497-.1833736-.71326058-.2942353-.17575065-.0842286-.24990942-.2950352-.16563381-.4707859.08422856-.1757977.29508228-.2499564.47078587-.1656808.20765397.0995685.42307203.1884555.64041935.2642141zm8.65483698-7.5032115c.1949021 0 .3528659.1579639.3528659.352913v1.2509117c0 3.833058-3.1184328 6.9514909-6.95149091 6.9514909-.27084892 0-.54367415-.0157164-.81099394-.0468198-.19358451-.0224923-.33230283-.1976783-.30976345-.3913099.02249231-.1936315.19744302-.3323498.39130987-.3098105.24031019.0279507.48574937.0421143.72944752.0421143 3.44391271 0 6.24571211-2.8017994 6.24571211-6.245665v-1.2509117c0-.1949021.1579638-.352913.3529129-.352913zm-6.59862501-11.4446844c3.83305811 0 6.95149091 3.11843288 6.95149091 6.95149094v3.43440756c0 .1949021-.1579638.352913-.3529129.352913s-.352913-.1580109-.352913-.352913v-3.43440756c0-3.44386567-2.8017993-6.24566505-6.24566501-6.24566505-1.34845682 0-2.63226.4227897-3.71255005 1.22267865-1.05958582.78450195-1.83199462 1.85891011-2.23384482 3.10704556-.05975993.1855381-.2585205.28745935-.44410565.22779354-.1855381-.05975993-.28755347-.25856755-.22779354-.44410565.44730539-1.38944179 1.30686016-2.58515789 2.48573055-3.45802924 1.20277437-.89051699 2.6317424-1.36120875 4.13256351-1.36120875zm-4.76879496 14.9986119c.17471543-.0862519.38641614-.0144459.47262101.1603636.38994528.7903838.99022667 1.4587069 1.73586113 1.9326925.76553876.4866434 1.6508797.7438463 2.56031282.7438463.68822731 0 1.35278591-.143565 1.97518321-.4266952.1774446-.0807936.3866514-.0023057.4673979.1750918.0806994.1773976.0023057.3866515-.175139.4673509-.7148134.3251975-1.47767.4900784-2.26744211.4900784-1.04377532 0-2.06002343-.2953175-2.93891782-.8540022-.85480221-.5433448-1.5430295-1.3096835-1.99024078-2.2161051-.08620487-.1747625-.01444591-.3863691.16036364-.472621zm8.16231167 2.2602427c-.0978274 0-.1951843-.0404674-.264967-.119661-.1288367-.1462472-.1146732-.3692411.031574-.4980778 1.0338467-.9106095 1.6268345-2.2200577 1.6268345-3.5926067v-6.09697111c0-1.02344753-.3197862-2.00031056-.924726-2.82499753-.115332-.15716389-.0814053-.37804034.0757586-.49332523.157211-.1152849.3780404-.0813582.4932782.0758057.6944386.94660662 1.0615151 2.06788162 1.0615151 3.24251706v6.09697111c0 1.5751681-.6801809 3.0776832-1.8661566 4.1222584-.0670534.0591012-.1502468.0880871-.2331108.0880871zm-.6736872-14.24455457c-.2328755-.16144591-.4812321-.30275225-.7381527-.42010757-.1773035-.08098175-.2553679-.29032971-.1743861-.46763317.0809818-.17725641.2901886-.25536781.4676332-.17438605.294894.13467158.5798124.29687037.846991.48203202.1602225.11104994.2000311.33089118.0890282.49111366-.0685121.09886267-.1785269.15189373-.2903768.15189373-.0693591 0-.139377-.0204219-.2007368-.06291262zm-1.8008442-1.47870523c.1921729.03251505.3216213.21466518.2890592.40683804-.032515.19212581-.2141005.32157427-.406838.28910628-.2628966-.04446703-.5324751-.0670064-.80120651-.0670064-2.63950648 0-4.78695822 2.14745173-4.78695822 4.78700527v5.92832571c0 .1949021-.15801088.352913-.35291294.352913-.19490205 0-.35291294-.1580109-.35291294-.352913v-5.92832571c0-3.02874593 2.46408522-5.49283116 5.4927841-5.49283116.30806951 0 .61726831.02588029.91898531.07688797zm-4.26295308 3.16148826c.75349266-1.11435791 2.00355736-1.77966939 3.34396777-1.77966939 2.22438671 0 4.03407731 1.80969051 4.03407731 4.03412432v3.95201321c0 .1949021-.1579639.352913-.352913.352913s-.3529129-.1580109-.3529129-.352913v-3.95201321c0-1.83524141-1.493057-3.32829844-3.32825141-3.32829844-1.10574683 0-2.13724078.54922665-2.75926161 1.46920011-.10916773.16144591-.32858548.20379546-.49003138.09467478-.16144591-.10916773-.20384252-.32858548-.09467478-.49003138zm-.33719656 3.45370017c-.19490205 0-.35291294-.15801089-.35291294-.35291294v-.8463323c0-.19490205.15801089-.35291294.35291294-.35291294.19490206 0 .35291295.15801089.35291295.35291294v.8463323c0 .19490205-.15801089.35291294-.35291295.35291294zm-.35291294 4.89772587v-3.83889293c0-.19490205.15801089-.35291294.35291294-.35291294.19490206 0 .35291295.15801089.35291295.35291294v3.83893993c0 1.2043743.65561814 2.3187322 1.71101606 2.9082379.17019815.0950513.23108739.3100458.13603617.4801969-.06460659.1157084-.18473816.1808797-.30844591.1808797-.05825416 0-.11726121-.0144459-.17175096-.0448906-1.27848596-.7141075-2.07268125-2.0645877-2.07268125-3.5244709zm8.06820158 0c0 2.2243867-1.8096905 4.0341243-4.03407725 4.0341243-.32472696 0-.64813638-.0389616-.96119369-.1157555-.18930251-.0464433-.30510501-.2375339-.25866166-.4268364.04644334-.1893025.23743983-.305105.42683644-.2586617.25804994.0633362.52489918.0954277.79301891.0954277 1.83519435 0 3.32825135-1.4931041 3.32825135-3.3282984v-.639196c0-.194902.1579639-.3529129.352913-.3529129s.3529129.1580109.3529129.3529129zm-1.4587068-6.0597035v3.3500849c0 .1949021-.1579638.352913-.352913.352913-.1949491 0-.3529129-.1580109-.3529129-.352913v-3.35003784c0-1.03210567-.8224754-1.88737842-1.83335921-1.90652983-.50372441-.00936396-.98312135.1805032-1.34473948.5353454-.36180635.35498337-.56103747.82868665-.56103747 1.33386976v6.09697111c0 .194902-.15801089.3529129-.35291294.3529129-.19490206 0-.35291295-.1580109-.35291295-.3529129v-6.09697111c0-.69622665.274331-1.34888032.77250291-1.83768827.49798369-.48866679 1.15506054-.75043409 1.85251064-.73725867 1.3927356.02639789 2.5257744 1.19821002 2.5257744 2.61221455zm-3.69208111 6.4683296v-3.0241345c0-.1949021.15801089-.352913.35291294-.352913s.35291294.1580109.35291294.352913v3.0241345c0 .6287497.51148853 1.1402382 1.14019113 1.1402382.6287027 0 1.1401911-.5115356 1.1401911-1.1402382v-1.7066399c0-.1949021.1579639-.352913.352913-.352913s.3529129.1580109.3529129.352913v1.7066399c0 1.0179421-.8281219 1.8460641-1.846017 1.8460641-1.01789503 0-1.84601701-.8281691-1.84601701-1.8460641zm1.88046131.2172061c-.1949491 0-.3529129-.1580108-.3529129-.3529129v-6.34772747c0-.22788765-.1748566-.42194272-.38975708-.43253011-.11415558-.00559955-.22162933.03449136-.30397569.11288509-.08253457.07853489-.12798976.18422056-.12798976.29748208v1.97570077c0 .19490206-.15801089.35291295-.35291294.35291295s-.35291294-.15801089-.35291294-.35291295v-1.97570077c0-.30397568.12653105-.59872857.34712517-.8087353.22369975-.21292414.51638222-.32180955.82539274-.30661076.5949172.02936236 1.0608564.52899297 1.0608564 1.137509v6.34772747c0 .1949021-.1579639.3529129-.352913.3529129z" /></svg>} />
                {__('Block ID', 'eightshift-boilerplate')}
              </Fragment>
            }
            help={__('Add Unique ID to the block.', 'eightshift-boilerplate')}
            value={id}
            onChange={onChangeId}
          />
        }

        {onChangeAnchor &&
          <TextControl
            label={
              <Fragment>
                <Icon icon={() => <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m19.5295279 10.0391845c-.2667382-.11145918-.5732189-.04944201-.7772961.1546352l-1.4263949 1.4263949c-.2040772.2040772-.2653648.510515-.1546352.7772961.1100429.2667382.370515.4401717.6588841.4401717h.5690558c-.4603862 2.9141202-1.9961373 3.2630472-4.1343777 3.7491846-1.1326609.2571673-2.3746781.5672103-3.5687124 1.2808583l.00103-6.4564377h2.8537769c.394206 0 .7132189-.3190129.7132189-.7132189s-.31897-.71321891-.7132189-.71321891h-2.8536052l.0006867-4.38047211c1.2271245-.31879828 2.1396996-1.42587983 2.1396996-2.75158798.0000429-1.57334764-1.2794421-2.8527897-2.85278971-2.8527897-1.57339056 0-2.85283262 1.27944206-2.85283262 2.85283262 0 1.3255794.91248927 2.43266094 2.13952789 2.75158798l-.00068669 4.3804721h-2.85201717c-.39420601 0-.71321888.3190129-.71321888.7132189s.31896995.7132189.71321888.7132189h2.8518455l-.00103005 6.4538197c-1.19283262-.7118026-2.4332618-1.0213305-3.56472103-1.2782403-2.13819742-.4861374-3.6739485-.8351073-4.13433476-3.7491846h.56901287c.28832618 0 .54884121-.1734335.65888412-.4401717.11072962-.2667381.04944206-.5732188-.15463519-.7772961l-1.42639485-1.4263948c-.20339056-.20407729-.50914163-.26536485-.77729614-.1546352-.26673819.11-.44017167.3704721-.44017167.6588412 0 6.0538626 2.7393133 6.6772103 5.38871245 7.2796995 1.40828326.3203863 2.86463519.6512018 4.11206008 1.8024893.1372103.1260515.31064378.1894421.48407726.1894421.17343351 0 .34686691-.0633906.48407721-.1894421 1.2474249-1.1512875 2.7037769-1.482103 4.1120601-1.8024893 2.6494421-.6024463 5.3887125-1.2258369 5.3887125-7.2796995 0-.2883691-.1734335-.5488412-.4401717-.6588842zm-10.97107296-7.1863948c0-.78635193.64008583-1.42639485 1.42639485-1.42639485.78630901 0 1.42639481.64008584 1.42639481 1.42639485s-.6400858 1.42639485-1.42639481 1.42639485c-.78630902 0-1.42639485-.64004292-1.42639485-1.42639485z" /></svg>} />
                {__('Anchor', 'eightshift-boilerplate')}
              </Fragment>
            }
            help={__('Adds data-anchor attribut to the block that is used for scroll to option.', 'eightshift-boilerplate')}
            value={anchor}
            onChange={onChangeAnchor}
          />
        }
      </PanelBody>
    </Fragment>
  );
};
