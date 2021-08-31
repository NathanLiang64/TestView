import { useHistory } from 'react-router';
import { useCheckLocation, usePageInfo } from 'hooks';
import SuccessImage from 'assets/images/stateSuccess.svg';
import ErrorImage from 'assets/images/stateError.svg';

/* Elements */
import {
  FEIBButton,
} from 'components/elements';

/* Styles */
import RegularBasicInformationWrapper from './regularBasicInformation.style';

const RegularBasicInformation2 = () => {
  const history = useHistory();
  const isSuccess = true;

  const toHome = () => {
    history.push('');
  };

  useCheckLocation();
  usePageInfo('/api/regularBasicInformation');

  return (
    <RegularBasicInformationWrapper>
      <form>
        <div className="stateArea">
          <div className="stateImage">
            <img src={isSuccess ? SuccessImage : ErrorImage} alt="Success" />
          </div>
          {
            isSuccess
              ? (
                <h3 className="stateText success">已完成基本資料更新</h3>
              )
              : (
                <h3 className="stateText error">基本資料變更失敗</h3>
              )
          }
        </div>
        <FEIBButton onClick={toHome}>
          確認
        </FEIBButton>
      </form>
    </RegularBasicInformationWrapper>
  );
};

export default RegularBasicInformation2;
