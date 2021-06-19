import Image from 'next/image'
import Link from 'next/link'

export default function HomeSection({ title, content, src, imgPosition }) {
    return (<div className="home-content" style={{ flexWrap: imgPosition === 'left' ? 'wrap' : 'wrap-reverse' }}>
        {
            imgPosition === 'left' ?
                <Image
                    src={`/assets/${src}`}
                    height={480}
                    width={650}
                /> : null
        }
        <div className="content">
            <h1>{title}</h1>
            <p>{content}</p>
            <div className="buttons-wraper">
                <Link href="/subscriptions"><button className="button-home yellow">Subscriptions</button></Link>
                <Link href="/weekSchedule"><button className="button-home white">Schedule</button></Link>
            </div>
        </div>
        {
            imgPosition === 'right' ?
                <Image
                    src={`/assets/${src}`}
                    height={430}
                    width={600}
                /> : null
        }
    </div>
    )
}
