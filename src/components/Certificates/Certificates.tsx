import { SubLayout } from 'layouts/SubLayout'
import { GenericMeta } from 'components/DefaultMeta'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faFileCode } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { CertificateData } from 'data/certificates'
import { CertificateCard } from './CertificateCard'

const Certificates = () => {
  return (
    <SubLayout
      title="Certificates"
      description="A list of all the certificates I've earned."
      iconTitle={['far', 'folder-open']}
    >
      <div className="mb-8"></div>
      <div className="grid">
        {CertificateData.map((certificate) => (
          <CertificateCard
            key={uuidv4()}
            data={certificate}
          />
        ))}
      </div>
    </SubLayout>
  )
}

export default Certificates
