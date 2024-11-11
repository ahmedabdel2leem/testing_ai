import { useRef } from "react";
import logo from "../../../images/onBoadingLogo.svg";
import Slider from "react-slick";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function OnBording() {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // rtl: true,
    arrows: false,
  };
  return (
    <main className='container m-auto flex justify-center items-center h-screen'>
      <section className=' w-1/2  h-fit  p-6 flex flex-col gap-6  items-center '>
        <figure>
          <img src={logo} alt='logo' />
        </figure>
        <section className='w-full'>
          <div className='  text-end p-9 '>
            <Slider
              ref={(slider) => {
                sliderRef.current = slider;
              }}
              {...settings}
            >
              <div key={5}>
                <h4 className='text-gray-700 text-text-lg font-semibold'>
                  التقويم الختامي والتقرير التشخيصي
                </h4>
                <p className='text-gray-600 text-text-sm font-semibold my-4'>
                  في هذه الخطوة الأخيرة، سنقوم بإجراء تقويم ختامي لقياس مدى
                  استيعابك للمفاهيم الجديدة. بعدها، ستحصل على تقرير تشخيصي شامل
                  يعرض مستوى تقدمك ويحدد نقاط القوة ومجالات التحسين. سيمكنك هذا
                  التقرير من معرفة إنجازاتك بشكلٍ دقيق ويُعدُّك للخطوات التالية
                  في مسيرتك التعليمية.
                </p>
              </div>
              <div key={4}>
                <h4 className='text-gray-700 text-text-lg font-semibold'>
                  : تجربة التعلم المخصصة للشرح والتطبيق
                </h4>
                <p className='text-gray-600 text-text-sm font-semibold my-4'>
                  وبناءً على أسلوب التعلم الخاص بك ومستوى المعرفة الذي تم
                  تحديده، سنقوم بتكييف المحتوى لتوفير تجربة تعليمية متكاملة
                  وملائمة. ستبدأ بتمهيد ، ثم نقدم الشرح بأسلوب ودرجة صعوبة تناسب
                  فهمك. ستتاح لك فرصة التعمق في فجوات المفاهيم السابقة، يتبعها
                  أسئلة بنائية إضافية، وأخيراً مثال تطبيقي من الحياة اليومية
                  يتبعه تدريب تفاعلي، مما يضمن فهماً عميقاً وممارسة شاملة.
                </p>
              </div>
              <div key={3}>
                <h4 className='text-gray-700 text-text-lg font-semibold'>
                  التقويم الاستكشافي للمعرفة السابقة
                </h4>
                <p className='text-gray-600 text-text-sm font-semibold my-4'>
                  سوف نكتشف مستوى معرفتك الحالي في هذا الموضوع لنتمكن من تصميم
                  المحتوى بما يناسب فهمك واحتياجاتك. عبر هذا التقويم الاستكشافي
                  البسيط، سنكتشف معرفتك السابقة، مما يساعدنا في تكييف محتوى
                  الدرس بناءً على ما تعرفه بالفعل وما تحتاج إلى استكشافه بشكل
                  أعمق. كل خطوة مصممة لدعم تقدمك الشخصي نحو النجاح.
                </p>
              </div>
              <div key={2}>
                <h4 className='text-gray-700 text-text-lg font-semibold'>
                  استطلاع أسلوب التعلم الخاص بك
                </h4>
                <p className='text-gray-600 text-text-sm font-semibold my-4'>
                  سوف نتعرف سويا أسلوب التعلم الأنسب لك، سواء كان بصريًا،
                  سمعيًا، منطقيًا، قرائيًا وكتابيًا، أو مزيجاً من هذه الأساليب.
                  سيساعدنا هذا الاستطلاع القصير في تحديد نوع المحتوى وطريقة عرضه
                  لتتناسب تمامًا مع أسلوبك التعليمي، مما يجعل تجربتك معنا أكثر
                  فعالية وامتاعًا.
                </p>
              </div>

              <div key={1} className='p-5'>
                <h4 className='text-gray-700 text-text-lg font-semibold '>
                  مرحباً بك في رحلتك التعليمية التفاعلية! في هذه الرحلة سوف تمر
                  بأربعة مراحل
                </h4>
              </div>
            </Slider>
            <div className='flex justify-between'>
              <button
                className='button bg-primary-300 p-2  text-white  rounded-lg flex text-center gap-2 z-20'
                onClick={next}
              >
                <ExternalLink />
                التالي
              </button>
              <div className='text-primary-300 p-2 cursor-pointer mt-auto z-20 border-primary-300  border rounded-lg'>
                <Link to='/msarat'>تخطي...</Link>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
